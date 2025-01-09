class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function() {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
        };
    }

    set setRead(value) {
        this.read = value;
    }
}

function displayBooks(library) { 
    container.innerHTML = '';

    library.forEach((book, index) => {
        createCard(book, index);
    });
}

function deleteBook (event) {
    let card = event.target.parentElement;
    const BookIndex = Number(card.getAttribute('data-index'));
    Library.splice(BookIndex, 1);
    displayBooks(Library);
}   

function handleCardCheckbox (event) {
    let card = event.target.parentElement;
    const BookIndex = Number(card.getAttribute('data-index'));

    if(event.target.checked) {
        Library[BookIndex].setRead = true;
    }
    else {
        Library[BookIndex].setRead = false;
    }

}

function createCard (book, index) {
    let newBook = null;
    let card = document.createElement('div');
    let title = document.createElement('h3');
    let detailsContainer = document.createElement('div');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let inputContainer = document.createElement('div');
    let label = document.createElement('label');
    let read = document.createElement('input');
    let deleteBtn = document.createElement('button');
    let icon = document.createElement('i');
    let buttonContainer = document.createElement('div');

    card.classList.add('card');
    card.setAttribute('data-index', `${index}`);

    title.innerText = `${book.title}`;
    author.innerText = `Author: ${book.author}`;
    pages.innerText = `Pages: ${book.pages}`;
    label.innerText = `Have read`;
    label.setAttribute('for', `card-checkbox${index}`);
    read.setAttribute('type', 'checkbox');
    read.setAttribute('id', `card-checkbox${index}`);
    read.setAttribute('name', `card-checkbox${index}`);
    
    

    if(book.read) read.checked = true;

    read.addEventListener('change', handleCardCheckbox);

    icon.classList.add('fa-solid');
    icon.classList.add('fa-trash')

    deleteBtn.appendChild(icon);
    deleteBtn.addEventListener('click', deleteBook);
    deleteBtn.classList.add('delete')

    detailsContainer.appendChild(author);
    detailsContainer.appendChild(pages);
    detailsContainer.classList.add('details-container');

    inputContainer.appendChild(label);
    inputContainer.appendChild(read);
    inputContainer.classList.add('input-container');

    buttonContainer.appendChild(inputContainer);
    buttonContainer.appendChild(deleteBtn);
    buttonContainer.classList.add('card-buttons');

    card.appendChild(title);
    card.appendChild(detailsContainer);
    card.appendChild(buttonContainer);
    container.appendChild(card);
    return newBook;
}



function addBooks(obj, library) {
    let newBook = null
    if('read' in obj){
        newBook = new Book(obj.title, obj.author, obj.pages, true);
    } else {
        newBook = new Book(obj.title, obj.author, obj.pages, false);
    }
    library.push(newBook);
} 



function handleFormSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    dataObj = Object.fromEntries(data.entries());
    addBooks(dataObj, Library);
    displayBooks(Library);
    form.reset();
    dialog.close();
}

const MyApp = () => {
    addBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    closeBtn.addEventListener('click', () => {
        dialog.close();
    });

    form.addEventListener('submit', (event) => handleFormSubmit(event));
    displayBooks(Library);
}

const container = document.querySelector('.cards-container');
const addBtn = document.querySelector('.add-book');
const closeBtn = document.querySelector('.close-button');
const dialog = document.querySelector('#dialog');
const form = document.querySelector('#form');

let dataObj = null;
const book1 = new Book('The Hobbit', 'J.R.R Tolkien', 295, false);
const book2 = new Book('Atomic Habits', 'James Clear ', 306, true);
const book3 = new Book('Book3', 'MyBook', 420, false);
const Library = [book1, book2, book1, book2];

MyApp();

