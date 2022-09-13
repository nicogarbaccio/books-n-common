const searchForm = document.querySelector('#search-form')

function fetchFavorites(){
    fetch("")
    .then(data => data.json())
    .then(books => {
         books.map((books) => { 
            createFavCards(books);
        })
    }) 
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
function authorSearch(first, last) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(`https://openlibrary.org/search/authors.json?q=${first}%20${last}`)
        .then(res => res.json())
        .then(renderBook())
    })
}

// Render search results
function renderSearch() {
    console.log("hey")
}

authorSearch()

// Render book cards 
function renderBook() {
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
