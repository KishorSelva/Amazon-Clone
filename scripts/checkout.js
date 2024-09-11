import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { calculateCartQuantity } from "../data/cart.js";

let quantity = calculateCartQuantity()

renderCheckoutHeader(quantity)
renderOrderSummary()
renderPaymentSummary()

