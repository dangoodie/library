const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
};

function addBookToLibrary(book) {
  if (typeof book === 'object') {
    const newBook = new Book(book.title, book.author, book.pages, book.readStatus);
    myLibrary.push(newBook);
  }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
addBookToLibrary(theHobbit);

// console.log(myLibrary);