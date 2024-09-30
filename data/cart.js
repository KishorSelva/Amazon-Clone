
export let cart;

loadFromStorage()

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '1'
  }, {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '2'
  }]
}

function saveToCart() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

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
      quantity: valueToBeAdded,
      deliveryOptionId: '1'
    });
  }
  saveToCart()
}

export function removeFromCart(productRemovedId) {
  let newCart = []
  cart.forEach((object) => {
    if (object.productId !== productRemovedId) {
      newCart.push(object)
    }
  })
  cart = newCart;
  saveToCart()
}

export function calculateCartQuantity() {
  let quantity = 0
  cart.forEach((element) => {
      quantity += element.quantity;
      
  })
  return quantity
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((object) => {
    if (object.productId === productId) {
      object.quantity = newQuantity
    }
  })
  saveToCart()
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  })

  matchingItem.deliveryOptionId = deliveryOptionId
  saveToCart()
}