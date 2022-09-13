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