import { cart } from "../data/cart-class.js";
import { orders } from "../data/orders.js";
import { products, getProduct, loadProducts, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
let quantity = cart.calculateCartQuantity()
document.querySelector(".js-cart-quantity").innerHTML = quantity ;
const url = new URL(window.location.href);


loadProducts(renderTrackingPage)

function renderTrackingPage() {


  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  let matchingOrder;
  let matchingProductOrder;
  let matchingProduct = getProduct(productId);



  orders.forEach((order) => {
    if(order.id == orderId) {
      matchingOrder = order;
    }
  })

  matchingOrder.products.forEach((product) => {
    if(product.productId == productId) {
      matchingProductOrder = product;
    }
  })

  const orderTime = dayjs(matchingOrder.orderTime);
  const estimatedDeliveryTime = dayjs(matchingProductOrder.estimatedDeliveryTime);
  const currentTime = dayjs();
  

  const numerator = currentTime.diff(orderTime);
  const denominator = estimatedDeliveryTime.diff(orderTime);

  const deliveryProgress = numerator / denominator * 100;



  let trackingHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${dayjs(matchingProductOrder.
          estimatedDeliveryTime
          ).format("dddd, MMMM DD")}
      </div>

      <div class="product-info">
        ${matchingProduct.name}
      </div>

      <div class="product-info">
        Quantity: ${matchingProductOrder.quantity}
      </div>

      <img class="product-image" src=${matchingProduct.image}>

      <div class="progress-labels-container">
        <div class="progress-label js-preparing-label">
          Preparing
        </div>
        <div class="progress-label js-shipped-label">
          Shipped
        </div>
        <div class="progress-label js-delivered-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width:${deliveryProgress}%"></div>
      </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;


  if (deliveryProgress < 50) {
    document.querySelector('.js-preparing-label').classList.add('current-status');
  } else if (deliveryProgress < 100) {
    document.querySelector('.js-shipped-label').classList.add('current-status');
  } else {
    document.querySelector('.js-delivered-label').classList.add('current-status');
  }

}