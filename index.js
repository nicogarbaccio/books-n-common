function fetchFavorites(){
    fetch("")
    .then(data => data.json())
    .then(books => {
         books.map((books) => { 
            createFavCards(books);
        })
    }) 
}