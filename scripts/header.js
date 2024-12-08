import { renderProductsGrid } from "./amazon.js";


const searchBar = document.querySelector('.js-search-bar');

const searchButton = document.querySelector('.js-search-button');


searchButton.addEventListener('click', () => {
  const search = document.querySelector('.js-search-bar').value;
  if (search) {
    window.location.href = `
    amazon.html?search=${search}
    `;
    renderProductsGrid();
  } else {
    window.location.href = "amazon.html"
    renderProductsGrid();
  }

})

searchBar.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    const search = document.querySelector('.js-search-bar').value;
    if (search) {
      window.location.href = `
      amazon.html?search=${search}
      `;
      renderProductsGrid();
    } else {
      window.location.href = "amazon.html"
      renderProductsGrid();
    }
  }
})

