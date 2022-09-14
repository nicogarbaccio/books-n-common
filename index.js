const searchForm = document.querySelector('.search-form')

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');
}

// Get books, invoke author search, render featured books
fetch(`https://gutendex.com/books`)
    .then(res => res.json())
    .then(data => {
        bookSearch(data)
        renderFeatured(data)
})

// Render featured books on load
function renderFeatured(data) {
    const spliceBooks = data?.results.splice(0, 6)
    spliceBooks?.forEach(book => {
        const featuredBooks = document.querySelector('#books-container')
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const img = document.createElement('img')
        const faveBtn = document.createElement('button')
        faveBtn.className = "fave-button"
        faveBtn.textContent = "Add to favorites"
        const queueBtn = document.createElement('button')
        queueBtn.className = 'queue-button'
        queueBtn.textContent = "Add to queue"
        img.src = book.formats['image/jpeg']
        featuredBooks.style.display = "flex"
        h3.textContent = book.title
        li.append(h3, img, faveBtn, queueBtn)
        featuredBooks.append(li)
    })
}

// Search for books
function bookSearch(data) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target.submit.value
        fetch(`https://gutendex.com/books?search=${name}`)
        .then(res => res.json())
        addSearch(data)
    })
}

// Add items to search results 
function addSearch(data) {
    const spliceBooks = data?.results.splice(0, 6)
    spliceBooks?.forEach(book => {
        const searchResults = document.querySelector('#search-results')
        const resultsContainer = document.querySelector('.results-container')
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const img = document.createElement('img')
        const faveBtn = document.createElement('button')
        faveBtn.className = "fave-button"
        faveBtn.textContent = "Add to favorites"
        const queueBtn = document.createElement('button')
        queueBtn.className = 'queue-button'
        queueBtn.textContent = "Add to queue"
        img.src = book.formats['image/jpeg']
        searchResults.style.display = "block"
        resultsContainer.style.display = "flex"
        h3.textContent = book.title
        li.append(h3, img, faveBtn, queueBtn)
        resultsContainer.append(li)
    })
}

// Condense functions? 
// function renderBooks() {
//     const spliceBooks = data?.results.splice(0, 6)
//     spliceBooks?.forEach(book => {
//         const searchResults = document.querySelector('#search-results')
//         const resultsContainer = document.querySelector('.results-container')
//         const li = document.createElement('li')
//         const h3 = document.createElement('h3')
//         const img = document.createElement('img')
//         const faveBtn = document.createElement('button')
//         faveBtn.className = "fave-button"
//         faveBtn.textContent = "Add to favorites"
//         const queueBtn = document.createElement('button')
//         queueBtn.className = 'queue-button'
//         queueBtn.textContent = "Add to queue"
//         img.src = book.formats['image/jpeg']
//         searchResults.style.display = "block"
//         resultsContainer.style.display = "flex"
//         h3.textContent = book.title
//         li.append(h3, img, faveBtn)
//         featuredBooks.append(li)
//     })
// }

//Delete book cards from favorites
function deleteFavorite(id) {
    fetch(`https://gutendex.com/books/${id}`, {
        method: "DELETE",
        header: { "Content-Type": "application/json" },
    })
        .then(res => res.json())
}

// Invoking functions 
bookSearch()