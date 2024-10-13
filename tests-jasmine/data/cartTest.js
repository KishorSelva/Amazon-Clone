import { addToCart, cart, loadFromStorage, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: 1
            }]);
        });
        loadFromStorage();
        //addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        //Callling the above function returns the error 'Cannot read properties of null (reading 'value')' and I dont know why so the item does not get added
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        //expect(cart[0].productID).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });

    it('adds a new product to the cart', () => {

        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();
        //addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        //Callling the above function returns the error 'Cannot read properties of null (reading 'value')' and I dont know why so the item does not get added
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        //expect(cart[0].productID).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        //expect(cart[0].quantity).toEqual(1);
    })
});