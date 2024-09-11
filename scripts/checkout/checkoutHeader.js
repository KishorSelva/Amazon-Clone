export function renderCheckoutHeader(quantity) {
    let innerHTML = `
        Checkout (<a class="return-to-home-link js-return-to-home-link"
        href="amazon.html">${quantity} items</a>)
    `
    document.querySelector('.js-checkout-header-middle-section').innerHTML = innerHTML
}