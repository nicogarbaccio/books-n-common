const searchForm = document.querySelector('#search-form')

function fetchFeatured(){
    fetch("https://gutendex.com/books/")
        .then(data => data.json())
        .then(data => console.log(data));
    } 

//deletes book cards from favorites
function deleteFavorite(id) {
    fetch(`http:///${id}`, {
        method: "DELETE",
        header: { "Content-Type": "application/json" },
    })
        .then(res => res.json())
}

// Search by author
function authorSearch() {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        renderSearch()
    })
}

// Render search results
function renderSearch(first, last) {
    fetch(`https://openlibrary.org/search/authors.json?q=${first}%20${last}`)
    .then(res => res.json())
    const searchResults = document.querySelector('#search-results')
    const resultsContainer = document.querySelector('.results-container')
    const li = document.createElement('li')
    const h3 = document.createElement('h3')
    const img = document.createElement('img')
    searchResults.style.display = "block"
    resultsContainer.style.display = "block"
    h3.textContent = "Test";
    li.append(h3)
    resultsContainer.append(li)
}

// Render book cards 
function renderBook() {

}

// Invoking functions 
fetchFeatured()

authorSearch()