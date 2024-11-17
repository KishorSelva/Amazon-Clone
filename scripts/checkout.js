import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { cart } from "../data/cart-class.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
//import { loadCart } from "../data/products.js";
//import '../data/cart-class.js';
//import '../data/car.js';
//import '../data/backend-practice.js';

async function loadPage() {
    try {
        // throw 'error 1';

        await Promise.all([cart.loadCartFetch(), loadProductsFetch()]);

        //await cart.loadCartFetch();
        //await loadProductsFetch();
        /*
        const value = await new Promise((resolve) => {
            // throw 'error2';

            
            cart.loadCart(() => {
                //reject('error3');
                resolve('value 1');
            });
            

        });
        */
    } catch (error) {
        console.log('Unexepected error. Please try again later.');
    }

    

    //console.log(value);
    renderOrderSummary();
    renderPaymentSummary();


}

loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        cart.loadCart(() => {
            resolve();
        });
    })

]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });

}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        cart.loadCart(() => {
            resolve();
        });
    }); 

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});

*/

/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    })

});
*/
let quantity = cart.calculateCartQuantity()

renderCheckoutHeader(quantity)


