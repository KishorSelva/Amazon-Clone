import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { calculateCartQuantity } from "../data/cart.js";
//import '../data/cart-class.js';
import '../data/car.js'

let quantity = calculateCartQuantity()

renderCheckoutHeader(quantity)
renderOrderSummary()
renderPaymentSummary()

