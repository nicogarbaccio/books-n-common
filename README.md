# Books 'N Common
Books ‘N Common is a single page app that allow users to rate and review books, keep track of books they want to read and books they have read. The app is built with the [Open Library API](https://openlibrary.org/developers/api), HTML, CSS, and JavaScript.

## Features:
The main functionality of the app is built using a fetch request. The user has the ability to search and filter books, add books to reading queue, rate books, and leave comments.
Using a POST request users can save their favorites by clicking on a star icon. The favorites can also be deleted when the user clicks the star agin by using a DELETE request.
A popup containing the books information will appear when the user clicks on a book cover in the featured section using the getElementById() method.
Users are able to go bewteen light and dark mode using a toggle button with a addEventListener.

## Instructions:
Fork this repository
Clone your forked repository to your local computer
npm install -g json-server
cd brew-pub
json-server --watch db.json

The Books 'N Common Team is: Nico Garbaccio & Kaeli Gilmore
