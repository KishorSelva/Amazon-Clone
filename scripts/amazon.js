import {cart} from '../data/cart-class.js';
import {products, loadProducts} from '../data/products.js'
import { formatCurrency } from './utils/money.js';
const url = new URL(window.location.href);


loadProducts(renderProductsGrid);

export function renderProductsGrid() {


  

  let productsDisplay = document.querySelector('.js-products-grid');

  let innerContent = '';

  
  const searchElement = url.searchParams.get('search');

  let localProducts = products.slice();
  



  if(searchElement) {
      localProducts = products.filter((items) => {
      return items.name.toLocaleLowerCase().includes(searchElement.toLowerCase()) || items.keywords.some((word) => {
        return word.toLowerCase().includes(searchElement.toLowerCase())
      });
    })
  }

  

  if (localProducts.length == 0) {
    innerContent = `
      <div style="font-size: 20px; margin: 10px position: float">
        No products matches your search.
      </div>
    `
  } else {
      localProducts.forEach((object) => {
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
                  src="${object.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                  ${object.rating.count}
                </div>
              </div>

              <div class="product-price">
                ${object.getPrice()}
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

              ${object.extraInfoHTML()}

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
  }



  productsDisplay.innerHTML = innerContent;

  let timeoutIdObject = {};



  function updateCartQuantity() {
    let cartQuantity = cart.calculateCartQuantity()
    

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;


  }

  function displayAddedMessage(productId) {
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
  }

  updateCartQuantity()

  document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      cart.addToCart(productId);
      
      updateCartQuantity();

      displayAddedMessage(productId);
    })
  });
}
