import { menuArray } from "/data.js"
const total = document.getElementById('total')
const itemContainer = document.getElementById('item-container') 
const modal = document.getElementById('modal')
const modalForm = document.getElementById('modal-form')
const confirmation =  document.getElementById('confirmation')
let yourOrder = []
let totalPrice = 0


function renderMenu(){
    itemContainer.innerHTML = menuArray.map(function(food){
        return `  <div class="menu-item">
                        <p class="item-pic">${food.emoji}</p>
                        <div class="item-text">
                            <h3>${food.name}</h3>
                            <p class="item-info">${food.ingredients.join(", ")}</p>
                            <p class="item-price">$${food.price}</p>
                        </div>
                    <button class="add-btn" id="add-btn" data-add="${food.id}">+</button>
                </div>`
    }).join("")
}

renderMenu()

function getTotalHtml() {
    let totalHtml =  `
        <div class="total-section">
                <p>Your Order</p>
                </div>
                <div class="total-details" id="details">
                    </div>
                    <div class="total-container">
                        <div class="total-price">
                            <p>Total price:</p>
                        </div>
                        <div class="total-price-value">
                            <p>$${totalPrice}</p>
                        </div>
                    </div>
                    <div class="btn-container">
                    <button class="complete-order-btn" id="order-btn">Complete Order</button>
                </div>  
        `
        return totalHtml }
        
        
function getOrderHtml(){
     let orderHtml = ''
    yourOrder.map(function(item){
    
    orderHtml +=
    `
     <div class="details-section">
        <div class="order-item">
           <p>${item.name}</p>
           <button class="remove-item-btn" data-remove="${item.id}">Remove</button>
            <p class="order-price">$${item.price}</p>
             </div>
            </div>
    `
    
    })
    return orderHtml
    }

document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
        total.classList.remove('hidden')
    }
    if (e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    
    else if (e.target.id === "order-btn"){
      openOrderModal()
        } 
    else if (e.target.id === "close-btn"){
      closeOrderModal()
        } 
})

modalForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const modalFormData = new FormData(modalForm)
    const usernameInput = modalFormData.get('username')
    
    confirmation.innerHTML = `
    <div class="order-thanks">
      <h2>Thanks, ${usernameInput}! Your order is on its way!</h2>
    </div>
  `
    closeOrderModal()
  
}) 

function openOrderModal(){
    modal.classList.remove('hidden')
    document.getElementById('overlay').style.display = 'block'
}

function closeOrderModal(){
    modal.classList.add('hidden')
    document.getElementById('overlay').style.display = 'none'
    clearTotal()
}
    



function handleAddClick(itemId){
    const targetedObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    
     
    if (!yourOrder.includes(targetedObj)) {
        yourOrder.push(targetedObj)
        totalPrice += targetedObj.price
    }
  
    
    renderTotal()
    renderOrder()
}


function handleRemoveClick(itemId){
    
    itemId = Number(itemId)
    
    let targetObj = menuArray.find(obj => obj.id === itemId);
   
     if (yourOrder.includes(targetObj)) {
        //order.pop(targetItemObj)
        
        const index = yourOrder.indexOf(targetObj);
        yourOrder.splice(index, 1);
        
        
        totalPrice -= targetObj.price
        //console.log("item price is: " + targetItemObj.price + " total price is: " + totalPrice)
   
    // const targetedObj = menuArray.filter(function(item){
    //     return item.id == itemId
    //  })[0]
        
    //  if (yourOrder.includes(targetedObj)) {
        // yourOrder.pop(removedItemIndex)
        // totalPrice -= targetedObj.price
    
    if (yourOrder.length == 0){
        clearTotal()
    }
    }

    renderTotal()
    renderOrder()
}

function clearTotal(){
    total.innerHTML = ""
    totalPrice = 0
}

function renderOrder(){
    document.getElementById("details").innerHTML = getOrderHtml()
}

function renderTotal() {
    total.innerHTML = getTotalHtml()
}



