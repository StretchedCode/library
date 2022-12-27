const hobbit = new Book('The Hobbit', 'Saul Goodman', 999, false);
const toaru = new Book('Toaru No Majutsu', 'Kazuma', 1000, true);
const mylibrary = [];

mylibrary.push(hobbit);
mylibrary.push(toaru);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

Book.prototype.ifRead = function () {
  this.read = !(this.read);
};

const contentBody = document.querySelector('.content-wrapper');
const bookForm = document.querySelector('#newBookForm');
const bookTitleForm = document.querySelector('#title');
const bookAuthorForm = document.querySelector('#author');
const bookPagesForm = document.querySelector('#pageLength');
const formBackBtn = document.querySelector('#back');
const addBookBtn = document.querySelector('#newBook');
const submitBtn = document.querySelector('#submit');

function booksToPage() {
  let count = 0;
  contentBody.querySelectorAll('.content').forEach((n) => { n.remove(); });
  mylibrary.forEach((item) => {
    const container = document.createElement('div');
    container.classList.add('content');

    const bookTitle = document.createElement('div');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = `Title: ${item.title}`;

    const bookAuthor = document.createElement('div');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = `Author: ${item.author}`;

    const bookPages = document.createElement('div');
    bookPages.classList.add('book-pages');
    bookPages.textContent = `Page Count: ${item.pages}`;

    const read = document.createElement('div');
    read.classList.add('read');
    read.textContent = `Read: ${item.read}`;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-wrapper');

    const readButton = document.createElement('button');
    readButton.classList.add('content-button');
    readButton.textContent = 'Read';
    readButton.setAttribute('data-index', count);

    const delButton = document.createElement('button');
    delButton.classList.add('content-button');
    delButton.textContent = 'Delete';
    delButton.setAttribute('data-index', count);
    count += 1;

    buttonContainer.append(readButton, delButton);

    container.append(bookTitle, bookAuthor, bookPages, read, buttonContainer);
    contentBody.appendChild(container);

    readButton.addEventListener('click', () => { readBook(readButton, read); });
    delButton.addEventListener('click', () => { deleteBook(delButton); });
  });
}

function deleteBook(button) {
  const index = button.getAttribute('data-index');
  mylibrary.pop(index);
  booksToPage();
}

function validateForm() {
  if (bookTitleForm.value === '' || bookAuthorForm.value === '' || bookPagesForm.value === '') {
    return false;
  }

  return true;
}

function resetFormFields() {
  bookTitleForm.value = '';
  bookAuthorForm.value = '';
  bookPagesForm.value = '';
}

function readBook(button, container) {
  const index = button.getAttribute('data-index');
  mylibrary[index].ifRead();
  container.textContent = `Read: ${mylibrary[index].read}`;
}

addBookBtn.addEventListener('click', () => {
  contentBody.querySelectorAll('.content').forEach((n) => { n.style.display = 'none'; });
  bookForm.style.display = 'block';
});

formBackBtn.addEventListener('click', () => {
  bookForm.style.display = 'none';
  contentBody.querySelectorAll('.content').forEach((n) => { n.style.display = 'flex'; });
  resetFormFields();
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (validateForm() === true) {
    const newBook = new Book(bookTitleForm.value, bookAuthorForm.value, bookPagesForm.value, false);
    mylibrary.push(newBook);
    bookForm.style.display = 'none';
    resetFormFields();
    booksToPage();
  }
});

booksToPage();
