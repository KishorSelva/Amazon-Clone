import { orders } from "../data/orders.js";
import formatCurrency from "./utils/money.js";
import { products, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
//console.log(orders);

await loadProductsFetch()
console.log(orders)

function generateOrderContainer() {
    orders.forEach((orderDetails) => {
        const orderSummary = `

          <div class="order-container">
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${dayjs(orderDetails.orderTime).format('MMMM DD')}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${formatCurrency(orderDetails.totalCostCents)}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${orderDetails.id}</div>
              </div>
            </div>

            <div class="order-details-grid">
              ${generateProductDetails(orderDetails)}
            </div>
          </div>
        
        `
    
        orderInfo += orderSummary;
    })
}

function generateProductDetails(orderDetails) {
  let productInfo = ``;

  orderDetails.products.forEach((orderProduct) => {
    let matchingProductObject;
    products.forEach((element) => {
      if(orderProduct.productId === element.id) {
        matchingProductObject = element
      }
    })
    

    const productSummary = `
      <div class="product-image-container">
        <img src="${matchingProductObject.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProductObject.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${dayjs(orderProduct.estimatedDeliveryTime).format('MMMM DD')}
        </div>
        <div class="product-quantity">
          Quantity: ${orderProduct.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `

    productInfo += productSummary;
  })

  return productInfo
}

let orderInfo = ``;

generateOrderContainer();

document.querySelector('.orders-grid-js').innerHTML = orderInfo;

/*
console.log(orders)
console.log(orderInfo)

*/
console.log(orders)

