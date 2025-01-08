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
    
    library.forEach(book => {
        let card = document.createElement('div');
        card.innerText = book.title;
        card.classList.add('card');
        container.appendChild(card);
    });
}

function addBooks(obj, library) {
    let newBook = null
    if('read' in obj){
        newBook = new Book(obj.title, obj.author, obj.pages, true);
    } else {
        newBook = new Book(obj.title, obj.author, obj.pages, false);
    }
    library.push(newBook);
    console.log(library);
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

const container = document.querySelector('.cards-container');
const addBtn = document.querySelector('.add-book');
const closeBtn = document.querySelector('.close-button');
const dialog = document.querySelector('#dialog');
const form = document.querySelector('#form');

let dataObj = null;
const book1 = new Book('The Hobbit', 'J.R.R Tolkien', 295, false);
const book2 = new Book('Atomic Habits', 'James Clear ', 306, true);
const book3 = new Book('Book3', 'MyBook', 420, false);
const Library = [book1, book2];


addBtn.addEventListener('click', () => {
    dialog.showModal();
});

closeBtn.addEventListener('click', () => {
    dialog.close();
});

form.addEventListener('submit', (event) => handleFormSubmit(event));

displayBooks(Library);