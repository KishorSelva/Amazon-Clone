const searchBar = document.querySelector('.js-search-bar');

searchBar.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    window.location.href = "amazon.html";
  }
})