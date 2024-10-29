import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { cart } from "../data/cart-class.js";
import { loadProducts } from "../data/products.js";
//import '../data/cart-class.js';
//import '../data/car.js'
//import '../data/backend-practice.js';


loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
let quantity = cart.calculateCartQuantity()

renderCheckoutHeader(quantity)


