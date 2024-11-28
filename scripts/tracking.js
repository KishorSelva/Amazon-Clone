import { cart } from "../data/cart-class.js";
let quantity = cart.calculateCartQuantity()
document.querySelector(".js-cart-quantity").innerHTML = quantity;
const url = new URL(window.location.href);
console.log(quantity)
console.log(url)
console.log(url.searchParams.get('orderId'));
console.log(url.searchParams.get('productId'));