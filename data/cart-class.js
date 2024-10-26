class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey  
    this.#loadFromStorage()

  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(`cart-${this.#localStorageKey}`)) || [{
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '1'
    }, {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '2'
    }]
  }

  saveToCart() {
    localStorage.setItem(`cart-${this.#localStorageKey}`, JSON.stringify(this.cartItems))
  }

  addToCart(productId) {
    let valueToBeAdded = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    let inCart = false
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId === productId) {
        cartItem.quantity += valueToBeAdded;
        inCart = true;
      }
    })
    if(!inCart) {
      this.cartItems.push({
        productId: productId,
        quantity: valueToBeAdded,
        deliveryOptionId: '1'
      });
    }
    this.saveToCart()
  }

  removeFromCart(productRemovedId) {
    let newCart = []
    this.cartItems.forEach((object) => {
      if (object.productId !== productRemovedId) {
        newCart.push(object)
      }
    })
    this.cartItems = newCart;
    this.saveToCart()
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    })
  
    matchingItem.deliveryOptionId = deliveryOptionId
    this.saveToCart()
  }
}



  
  export const cart = new Cart('cart-oop');
  const businessCart = new Cart('cart-business');



  
  console.log(cart)
  console.log(businessCart)
  console.log(businessCart instanceof Cart)
  
  
  
  
  
  export function calculateCartQuantity() {
    let quantity = 0
    cart.cartItems.forEach((element) => {
        quantity += element.quantity;
        
    })
    return quantity
  }
  
  export function updateQuantity(productId, newQuantity) {
    cart.cartItems.forEach((object) => {
      if (object.productId === productId) {
        object.quantity = newQuantity
      }
    })
    cart.saveToCart()
  }
  
  //cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e')
  console.log(cart);