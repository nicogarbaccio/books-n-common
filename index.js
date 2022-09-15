const switchElement = document.querySelector('.switch')

switchElement.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})

const searchForm = document.querySelector('.search-form')
const readingQueue = document.querySelector('#queue-container')
const favesList = document.querySelector('.favorites-list')
const resultsContainer = document.querySelector('.results-container')
const moreResults = document.querySelector('.more-results')
const searchBox = document.querySelector('#search-box')

// Log-in popup
const loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').addEventListener('click', () => {
    loginForm.classList.toggle('active');
})

document.querySelector('#close-login-btn').addEventListener('click', () => {
    loginForm.classList.remove('active');
})

// Get books, invoke author search, render featured books
fetch(`https://gutendex.com/books`)
    .then(res => res.json())
    .then(data => {
        bookSearch(data)
        renderFeatured(data)
})

// Render featured books on load & add to faves & queue
function renderFeatured(data) {
    const spliceBooks = data?.results.splice(0, 6)
    spliceBooks?.forEach(book => {
        const featuredBooks = document.querySelector('#books-container')
        const newBook = document.createElement('li')
        const h3 = document.createElement('h3')
        const img = document.createElement('img')
        const faveBtn = document.createElement('button')
        faveBtn.className = "fave-button"
        faveBtn.textContent = "Add to favorites"
        const queueBtn = document.createElement('button')
        queueBtn.className = 'queue-button'
        queueBtn.textContent = "Add to queue"
        img.src = book.formats['image/jpeg']
        h3.textContent = book.title
        newBook.append(h3, img, faveBtn, queueBtn)
        featuredBooks.append(newBook)
        queueBtn.addEventListener('click', function () {
            const queueBook = document.createElement('li')
            const queueh3 = document.createElement('h3')
            queueh3.textContent = book.title
            const queueImg = document.createElement('img')
            queueImg.src = book.formats['image/jpeg']
            queueBook.append(queueh3, queueImg)
            readingQueue.append(queueBook)
        })
        faveBtn.addEventListener('click', function() {
            const favBook = document.createElement('li')
            const favh3 = document.createElement('h3')
            favh3.textContent = book.title
            const favImg = document.createElement('img')
            favImg.src = book.formats['image/jpeg']
            favBook.append(favh3, favImg)
            favesList.append(favBook)
        })
    })
    
}

// Search for books
function bookSearch() {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target['search-box'].value
        e.target.reset()
        fetch(`https://gutendex.com/books?search=${name}%20`)
        .then(res => res.json())
        .then(data => addSearch(data))
    })
}

// Render results and buttons
function getResults (book) {
    const searchResults = document.querySelector('#search-results')
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
    queueBtn.addEventListener('click', function () {
        const queueBook = document.createElement('li')
        const queueh3 = document.createElement('h3')
        queueh3.textContent = book.title
        const queueImg = document.createElement('img')
        queueImg.src = book.formats['image/jpeg']
        queueBook.append(queueh3, queueImg)
        readingQueue.append(queueBook)
    })
    faveBtn.addEventListener('click', function() {
        const favBook = document.createElement('li')
        const favh3 = document.createElement('h3')
        favh3.textContent = book.title
        const favImg = document.createElement('img')
        favImg.src = book.formats['image/jpeg']
        favBook.append(favh3, favImg)
        favesList.append(favBook)
    })
}

// Add multiple books to search results 
function addSearch(data) {
    [...resultsContainer.children].forEach(element => {
        element.remove()
    })
    const spliceBooks = data?.results.splice(0, 6)
    spliceBooks?.forEach(book => {
        getResults(book)
    })
    moreResults.style.display = "block"
    const moreResultsButton = document.createElement('button')
    moreResultsButton.className = "more-results-button"
    moreResultsButton.textContent = "Get more results"
    moreResults.append(moreResultsButton)
    moreResultsButton.addEventListener('click', function() {
        [...resultsContainer.children].forEach(element => {
                element.remove()
        })
        const spliceResults = data?.results.splice(7, 13)
        spliceResults.forEach(book => {
            getResults(book)
        })
    })
    searchBox.addEventListener('change', () => {
        moreResultsButton.remove()
    })
    searchForm.addEventListener('submit', () => {
        if (searchBox.value === searchBox.value) {
            moreResultsButton.remove()
        }
    })
}

//post method on a favorited books
function addFavorite(favBooks, event){
    event.preventDefault();
    fetch(`https://gutendex.com/books/${id}`,{
            method: "POST",
            headers:{
            "Content-Type" : "application/json"
            },
            body: JSON.stringify(favBooks)
        })
  
}

// Swipe thru containers
var swiper = new Swiper(".readong-queue-slider", {
    spaceBetween: 10,
    loop:true,
    centeredSlides: true,
    autoplay: {
      delay: 9500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
});

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