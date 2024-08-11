import {cart} from '../data/cart.js';



let productsDisplay = document.querySelector('.js-products-grid');

let innerContent = '';

products.forEach((object) => {
    innerContent  += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${object.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${object.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${object.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${object.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(object.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${object.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-message-${object.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button js-add-to-cart-button button-primary" data-product-id="${object.id}">
            Add to Cart
          </button>
        </div>
    `
})

productsDisplay.innerHTML = innerContent;

let timeoutIdObject = {};

document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    let valueToBeAdded = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    let inCart = false
    cart.forEach((item) => {
      if(item.productId === productId) {
        item.quantity += valueToBeAdded;
        inCart = true;
      }
    })
    if(!inCart) {
      cart.push({
        productId: productId,
        quantity: 1
      });
    }
    
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    })

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    let addedMessage = document.querySelector(`.js-added-message-${productId}`);

    addedMessage.classList.add('clicked');
    
    const prevoiusTimeoutId = timeoutIdObject[productId]

    if(prevoiusTimeoutId) {
      clearTimeout(prevoiusTimeoutId)
    } 

    let timeoutId = setTimeout(() => {
      addedMessage.classList.remove('clicked')
    }, 2000);

    timeoutIdObject[productId] = timeoutId

    
  })
})