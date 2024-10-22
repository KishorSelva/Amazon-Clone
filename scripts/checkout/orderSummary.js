import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js'
import { products, getProduct } from '../../data/products.js'
import { formatCurrency } from '../utils/money.js';

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {

  let productsText = '';

  cart.forEach((element) => {
      const matchingObject = getProduct(element.productId);

      const deliveryOptionId = element.deliveryOptionId

      const deliveryOption = getDeliveryOption(deliveryOptionId)



 
      const dateString = calculateDeliveryDate(deliveryOption)

      productsText += `
          <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingObject.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingObject.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingObject.name}
                  </div>
                  <div class="product-price">
                    ${matchingObject.getPrice()}
                  </div>
                  <div class="product-quantity
                    js-product-quantity-${element.productId}">
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
                    <span class="delete-quantity-link link-primary js-delete-quantity-link js-delete-link-${element.productId}" data-product-id="${element.productId}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingObject, element)}
                  
                </div>
              </div>
            </div>
      `
  })


  function deliveryOptionsHTML(matchingObject,element) {
    let HTML = '';
    deliveryOptions.forEach((deliveryOption) => {

      const dateString = calculateDeliveryDate(deliveryOption)
      const priceString = deliveryOption.priceCents === 0 
      ? 'FREE' 
      : `$${formatCurrency(deliveryOption.priceCents)} -`

      const isChecked = deliveryOption.id === element.deliveryOptionId

      console.log(isChecked)

      HTML += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingObject.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingObject.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
          </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    })

    return HTML;
  }

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
      renderPaymentSummary()
    })
  })


  function updateTotalAmount() {
    let totalQuantity = calculateCartQuantity()

    renderCheckoutHeader(totalQuantity)
  }

  updateTotalAmount();

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
      renderPaymentSummary()
    })
    document.querySelector(`.js-quantity-input-${productId}`).addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        changeQuantityBox(productId)
        renderPaymentSummary()
      }
    })
  })

  function changeQuantityBox(productId) {
    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
      let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
      if(newQuantity >= 0 & newQuantity < 1000) {
        updateQuantity(productId, newQuantity);
        renderOrderSummary()
        updateTotalAmount()
      } else {
        console.log("Too much Brah")
      }
      
  }

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId
      const deliveryOptionId = element.dataset.deliveryOptionId
      updateDeliveryOption(productId, deliveryOptionId)
      renderPaymentSummary()
      renderOrderSummary();
    })
  })
}

