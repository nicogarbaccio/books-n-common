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
        const name = e.target.search.value
        console.log(name)
        fetch(`http://openlibrary.org/search.json?author=${name}`)
        .then(res => res.json())
        .then (data => console.log(data))
    })
}

// Render search results
// function renderSearch(name) {
//     fetch(`http://openlibrary.org/search.json?author=${name}`)
//     .then(res => res.json())
//     .then(data => {
//         data.docs.forEach(book => {
//             console.log(book)
//             // const searchResults = document.querySelector('#search-results')
//             // const resultsContainer = document.querySelector('.results-container')
//             // const li = document.createElement('li')
//             // const h3 = document.createElement('h3')
//             // const img = document.createElement('img')
//             // searchResults.style.display = "block"
//             // resultsContainer.style.display = "flex"
//             // h3.textContent = book.title
//             // li.append(h3)
//             // resultsContainer.append(li)
//         })
//     })
// }

// Render book cards 
function renderBook() {

}

// Invoking functions 
fetchFeatured()

authorSearch()