const searchForm = document.querySelector('#search-form')

//Delete book cards from favorites
function deleteFavorite(id) {
    fetch(`https://gutendex.com/books/${id}`, {
        method: "DELETE",
        header: { "Content-Type": "application/json" },
    })
        .then(res => res.json())
}

// Get books, invoke author search
fetch(`https://gutendex.com/books/`)
        .then(res => res.json())
        .then(data => {
            authorSearch(data)
        })

// Search by author
function authorSearch(data) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addSearch(data)
        // const name = e.target.search.value
        // function handleFilter() {
        //     data.results.filter(book => {
        //         console.log(book.authors['name'] = "Austen, Jane")
        //     })
        // } 
        // handleFilter()
    })
}

// Add items to search results 
// name param will be used when filter works 
function addSearch(data, name) {
    const spliceBooks = data?.results.splice(0, 5)
    spliceBooks?.forEach(book => {
        const searchResults = document.querySelector('#search-results')
        const resultsContainer = document.querySelector('.results-container')
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const img = document.createElement('img')
        img.src = book.formats['image/jpeg']
        searchResults.style.display = "block"
        resultsContainer.style.display = "flex"
        h3.textContent = book.title
        li.append(h3, img)
        resultsContainer.append(li)
    })
}

// Invoking functions 

authorSearch()