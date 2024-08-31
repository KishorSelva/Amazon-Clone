import { cart, removeFromCart, calculateCartQunatity, updateQuantity } from '../data/cart.js'
import { products } from '../data/products.js'
import { formatCurrency } from './utils/money.js';



let productsText = '';

cart.forEach((element) => {
    let matchingObject
    products.forEach((object) => {
        if(element.productId === object.id) {
            matchingObject = object;
        } 
    })
    productsText += `
        <div class="cart-item-container js-cart-item-container-${matchingObject.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingObject.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingObject.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingObject.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="js-quantity-label-${element.productId} quantity-label">${element.quantity}</span>
                  </span>
                  <span class="update-quantity-link-primary js-update-quantity-link-primary" data-product-id="${element.productId}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${element.productId}"></input>
                  <span class="save-quantity-link link-primary" data-product-id="${matchingObject.id}">
                  Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${element.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${element.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${element.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${element.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `
})

let cartDisplayElement = document.querySelector('.js-order-summary');

cartDisplayElement.innerHTML = productsText




let deleteLinkElement = document.querySelectorAll('.js-delete-quantity-link');

console.log(deleteLinkElement);

deleteLinkElement.forEach((element) => {
  element.addEventListener('click', () => {
    let productRemovedId = element.dataset.productId;
    removeFromCart(productRemovedId);
    let container = document.querySelector(`.js-cart-item-container-${productRemovedId}`)

    container.remove()
    updateTotalAmount()
  })
})


function updateTotalAmount() {
  let totalQuantity = calculateCartQunatity()

  document.querySelector('.js-return-to-home-link').innerHTML = `${totalQuantity} items`
}

updateTotalAmount()

document.querySelectorAll('.js-update-quantity-link-primary').forEach((element) => {
  element.addEventListener('click', () => {
    let productId = element.dataset.productId
    let containerObject = document.querySelector(`.js-cart-item-container-${productId}`)
    containerObject.classList.add('is-editing-quantity')
  })
})

document.querySelectorAll('.save-quantity-link').forEach((link) => {

  let productId = link.dataset.productId
  link.addEventListener('click', () => {
    changeQuantityBox(productId)
  })
  document.querySelector(`.js-quantity-input-${productId}`).addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      changeQuantityBox(productId)
    }
  })
})

function changeQuantityBox(productId) {
  document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
    let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
    console.log(newQuantity)
    updateQuantity(productId, newQuantity);
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity
    updateTotalAmount()
}