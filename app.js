const myLibrary = [];
const library = document.querySelector(".library");
const addBookBtn = document.querySelector(".new-book");
const form = document.querySelector("form");
const modal = document.querySelector(".modal-container");
const modalExit = document.querySelector(".modal-exit");

function Book(title, author, pages, readStatus, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// Book.prototype.info = function () {
//   return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
// };

function addBookToLibrary(book) {
  if (typeof book === "object") {
    const newBook = new Book(
      book.title,
      book.author,
      book.pages,
      book.readStatus
    );
    myLibrary.push(newBook);
  }
}

function buildCard(book, index) {
  // build card div
  const card = document.createElement("div");
  card.classList.add("card");
  library.appendChild(card);

  // build individual elements in the card
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const anchor = document.createElement("a");
  const readStatus = document.createElement("div");

  // add classes
  title.classList.add("book-title");
  author.classList.add("author");
  pages.classList.add("pages");
  readStatus.classList.add("read-status-btn");
  anchor.classList.add("read-status");

  // adding text
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  anchor.href = "#";

  // set read status styling and text
  function setReadStyle(book) {
    if (book.readStatus) {
      readStatus.textContent = "Read";
      readStatus.classList.add("read");
      readStatus.classList.remove("not-read");
    } else {
      readStatus.textContent = "Not Read";
      readStatus.classList.add("not-read");
      readStatus.classList.remove("read");
    }
  }
  setReadStyle(book);
  readStatus.dataset.index = index;

  function handleReadStatus(e) {
    const i = e.target.dataset.index;
    myLibrary[i].readStatus = !myLibrary[i].readStatus;
    setReadStyle(myLibrary[i]);
  }
  readStatus.addEventListener("click", handleReadStatus);

  // append children
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(anchor);
  anchor.appendChild(readStatus);
}

function renderLibrary(books) {
  // delete all cards
  const current = document.querySelectorAll(".card");
  current.forEach((child) => {
    child.remove();
  });

  // render all cards
  books.forEach((book, index) => {
    buildCard(book, index);
  });
}

// Test cases
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(theHobbit);

renderLibrary(myLibrary);

function handleSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const newBook = new Book();

  newBook.title = data.get("bookTitle");
  newBook.author = data.get("author");
  newBook.pages = data.get("pages");
  if (data.get("readStatus")) {
    newBook.readStatus = true;
  } else {
    newBook.readStatus = false;
  }

  // zero out inputs after submitting
  document.getElementById("book-title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;

  addBookToLibrary(newBook);
  renderLibrary(myLibrary);
  modal.classList.add("hidden");
}

form.addEventListener("submit", handleSubmit);

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("hidden");
});

modalExit.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("hidden");
});
