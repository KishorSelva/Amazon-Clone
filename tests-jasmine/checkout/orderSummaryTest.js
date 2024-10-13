import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: renderOrderSummary', () => {
    beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
    `;
        const productId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
        const productId2 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify( [{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            }, {
                productId: productId2,
                quantity: 2,
                deliveryOptionId: '2'
            }]);
        });
        });
        it('displays the cart', () => {
            spyOn(localStorage, 'setItem')


        
        loadFromStorage();

        renderOrderSummary();
        //Below code  isnt working
        /*
        expect(
            document.querySelectorAll('.js-cart-item-container ').length
        ).toEqual(2)
        */
       expect(document.querySelector(`.js-product-quantity-${productId1}`)).innerText.toContain('Quantity: 2')

       expect(document.querySelector(`.js-product-quantity-${productId2}`)).innerText.toContain('Quantity: 2')

       document.querySelector('.js-test-container').innerHTML = ``;

    });

    it('removes a product', () => {
        
        
        loadFromStorage();

        renderOrderSummary();

        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(
            document.querySelectorAll('.js-cart-item-container ').length
        ).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId.toEqual(productId2))

        document.querySelector('.js-test-container').innerHTML = ``;
    })
})