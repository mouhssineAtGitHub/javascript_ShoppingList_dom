/* Global object variables declaration */
const ul_shoppingList = document.querySelector('#myList');
const ul_done = document.querySelector('#doneList');
const itemName = document.querySelector('#itemName');
const itemQuantity = document.querySelector('#itemQuantity');
const shoppingList = [];
let shoppingList_id = 0;

/* The items list displayer */ 
const displayItems = (isDone) =>{
    clearList(isDone? ul_done : ul_shoppingList);
    shoppingList.forEach((item)=>{
        if(item.isDone == true && item.isDone == isDone){
            const li_item = document.createElement('li');
            li_item.id = item.id;
        
            const span_Name = document.createElement('span');
            span_Name.className = "spanName";
            span_Name.textContent = item.name;
            span_Name.style.textDecoration= isDone? "line-through" : "none";
        
            const span_Quantity= document.createElement('span');
            span_Quantity.className = "spanQuantity";
            span_Quantity.textContent = item.quantity;
            span_Quantity.style.textDecoration = isDone? "line-through" : "none";

            const btn1 = document.createElement('i');
            const btn2 = document.createElement('i');
        
            btn1.className = isDone? "fa fa-undo" : "fas fa-check";
            btn2.className = "fa fa-trash";

            // add item to list
            li_item.appendChild(span_Name);
            li_item.appendChild(span_Quantity);
            li_item.appendChild(btn1);
            li_item.appendChild(btn2);
            
            ul_done.appendChild(li_item);
        
        }else if(item.isDone == false && item.isDone == isDone ){
            const li_item = document.createElement('li');
            li_item.id = item.id;
        
            const span_Name = document.createElement('span');
            span_Name.className = "spanName";
            span_Name.textContent = item.name;
            span_Name.style.textDecoration= isDone? "line-through" : "none";
        
            const span_Quantity= document.createElement('span');
            span_Quantity.className = "spanQuantity";
            span_Quantity.textContent = item.quantity;
            span_Quantity.style.textDecoration = isDone? "line-through" : "none";

            const btn1 = document.createElement('i');
            const btn2 = document.createElement('i');
        
            btn1.className = isDone? "fa fa-undo" : "fas fa-check";
            btn2.className = "fa fa-trash";

            // add item to list
            li_item.appendChild(span_Name);
            li_item.appendChild(span_Quantity);
            li_item.appendChild(btn1);
            li_item.appendChild(btn2);
            
            ul_shoppingList.appendChild(li_item); 
        }
    })
}


/* Function for adding new item to shopping list */
const addItem = () =>{   
    let fname = itemName.value;
    let fquantity = itemQuantity.value;
    const patt1 = fname.match(/^[a-zA-Z0-9 ]+$/);
    const patt2 = fquantity.match(/\d/);

    if(patt1 == null){
        alert("Check your name input Please");
        return false;      
    }

    if(patt2 == null){
        alert("Check your quantity input Please");
        return false;      
    }
    
    if (fname === '' || fquantity === '' ) {
        alert("Some of the  inputs are empty!!!");
        return false;
    }
    else {    
        shoppingList_id++;   
        shoppingList.unshift({id:shoppingList_id, name:fname, quantity:fquantity, isDone:false});
        displayItems(false);
        itemName.value="";
        itemQuantity.value=""; 
        document.querySelector("#myDIV2").style.display="block";
        document.querySelector("#expander2").className="fa fa-close";
        
    } 
}

/* editing event handler */
const shoppingListEventHandler = (event) => {
    if( event.target.className == 'fa fa-trash' ){                
        deleteItem(event);
    }
    else if( event.target.className == 'fas fa-check' ){
        removeItem(event);
    }
}
/* shopping list editing event handler */
const editEventHandler = (event) => {
    if( event.target.className == 'spanName' || event.target.className == 'spanQuantity' ){                
        event.target.contentEditable ="true";
    }
}

/* mouhseOut editing event handler */
const mouseOutEventHandler = (event) => {
    if(event.target.className == 'spanName' && event.target.contentEditable == "true"){                
        event.target.contentEditable ="false";
        shoppingList[getPostion(shoppingList, event.target.parentNode.id)].name = event.target.textContent;
        displayItems(false);
    }
    else if(event.target.className == 'spanQuantity' && event.target.contentEditable == "true"){                
        event.target.contentEditable ="false";
        shoppingList[getPostion(shoppingList, event.target.parentNode.id)].quantity = event.target.textContent;
        displayItems(false);
    }     
}

// Deleting an item from ShoppingList 
const deleteItem = (event) => {
    let id_item = event.target.parentNode.id;
    shoppingList.splice(getPostion(shoppingList, id_item),1);
    displayItems(false);
}

/* function for removing an item form shopping list to done list */
const removeItem = (event) => {
    const pos = getPostion(shoppingList, event.target.parentNode.id);
    shoppingList[pos].isDone = true;
    displayItems(false);
    displayItems(true);
    document.querySelector("#myDIV3").style.display="block";
    document.querySelector("#expander3").className="fa fa-close";
}

//Adding event listener to ul_shoppingList
ul_shoppingList.addEventListener("click", shoppingListEventHandler);

//Adding event listener to ul_shoppingList
ul_shoppingList.addEventListener("dblclick", editEventHandler);

//Adding event listener to ul_shoppingList
ul_shoppingList.addEventListener("mouseout", mouseOutEventHandler);

/* done list event handler */
const doneListEventHandler = (event) => {
    if( event.target.className == 'fa fa-undo' ){                
        undo(event);
    }
    else if( event.target.className == 'fa fa-trash' ){
        deleteFromDoneList(event);
    }
}

/* function for deleting item from done list */
const deleteFromDoneList = (event) => {
    const id_item = event.target.parentNode.id;
    shoppingList.splice(getPostion(shoppingList, id_item),1);
    displayItems(true);

}

/* function undo : move an item back to shopping list */
const undo = (event) => {
    const id_item = event.target.parentNode.id;
    shoppingList[getPostion(shoppingList, id_item)].isDone = false;
    displayItems(false);
    displayItems(true);
    document.querySelector("#myDIV2").style.display="block";
    document.querySelector("#expander2").className="fa fa-close";
}

// add event listener to done list ul 
ul_done.addEventListener("click", doneListEventHandler);

// helper function: it clears all the children of a parent element
const clearList = (mylist)=>{
    while (mylist.firstChild) {
        mylist.removeChild(mylist.firstChild);
    }
}


const my_toggler = ()=> {
    const item = event.target.id;
    let divSelector="";
    switch (item) {
        case "expander1":
            divSelector = "myDIV1";
            break; 
        case "expander2":
            divSelector = "myDIV2";
            break;
        case "expander3":
            divSelector = "myDIV3";
            break; 
    }

const x = document.getElementById(divSelector);
    if (x.style.display === "none")
    {
        event.target.className="fa fa-close";
        x.style.display = "block";
    }else{
        x.style.display = "none";
        event.target.className="fa fa-plus";
    }     
}

const getPostion = (myArray, myId)=>{
    return myArray.findIndex(function(element){
        return myId == element.id;
        //console.log("element.id--:", element.id);
    });
}
//Default toggling
document.querySelector("#myDIV1").style.display="none";
document.querySelector("#myDIV2").style.display="none";
document.querySelector("#myDIV3").style.display="none";


