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

function addBooks(title, author, pages, read, library) {
    let newBook = new Book(title, author, pages, read);
    library.push(newBook);
} 

function displayBooks(library) { 
    library.forEach(book => {
        console.log(book);
        let card = document.createElement('div');
        card.innerText = book.title;
        card.classList.add('card');
        container.appendChild(card);
    });
}

const container = document.querySelector('.cards-container');
const book1 = new Book('The Hobbit', 'J.R.R Tolkien', 295, false);
const book2 = new Book('Atomic Habits', 'James Clear ', 306, true);
const book3 = new Book('Book3', 'MyBook', 420, false);

const Library = [book1, book2, book3];

displayBooks(Library);
