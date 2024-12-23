import { renderProductsGrid } from "./amazon.js";


const searchBar = document.querySelector('.js-search-bar');

const searchButton = document.querySelector('.js-search-button');


searchButton.addEventListener('click', () => {
  const search = searchBar.value.trim();
  if (search) {
    window.location.href = `
    index.html?search=${search}
    `;
    renderProductsGrid();
  } else {
    window.location.href = "index.html"
    renderProductsGrid();
  }
  
  
})

searchBar.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    const search = searchBar.value.trim();
    if (search) {
      window.location.href = `
      index.html?search=${search}
      `;
      renderProductsGrid();
    } else {
      window.location.href = "index.html"
      renderProductsGrid();
    }
  }
  
  

})

