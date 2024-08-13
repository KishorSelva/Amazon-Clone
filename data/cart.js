export const cart = [];

export function addToCart(productId) {
    let valueToBeAdded = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    let inCart = false
    cart.forEach((cartItem) => {
      if(cartItem.productId === productId) {
        cartItem.quantity += valueToBeAdded;
        inCart = true;
      }
    })
    if(!inCart) {
      cart.push({
        productId: productId,
        quantity: valueToBeAdded
      });
    }
  }