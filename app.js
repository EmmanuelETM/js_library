class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    get info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    }

    set setRead(value) {
        this.read = value;
    }
}

const MyApp = (() => {
    const library = []
    const container = document.querySelector('.cards-container');
    const addBtn = document.querySelector('.add-book');
    const closeBtn = document.querySelector('.close-button');
    const dialog = document.querySelector('#dialog');
    const form = document.querySelector('#form');

    function displayBooks() {
        container.innerHTML = '';
        library.forEach((book, index) => createCard(book, index));
    }

    function deleteBook(event) {
        const card = event.target.closest('.card');
        const index = Number(card.getAttribute('data-index'));
        library.splice(index, 1);
        displayBooks();      
    }

    function handleCardCheckbox(event) {
        const card = event.target.closest('.card');
        const index = Number(card.getAttribute('data-index'));
        library[index].setRead = event.target.checked;
    }

    function createCard(book, index) {
        const card = document.createElement('div');
        const title = document.createElement('h3');
        const detailsContainer = document.createElement('div');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const inputContainer = document.createElement('div');
        const label = document.createElement('label');
        const read = document.createElement('input');
        const deleteBtn = document.createElement('button');
        const icon = document.createElement('i');
        const buttonContainer = document.createElement('div');

        card.classList.add('card');
        card.setAttribute('data-index', `${index}`);

        title.innerText = book.title;
        author.innerText = `Author: ${book.author}`;
        pages.innerText = `Pages: ${book.pages}`;
        label.innerText = `Have read`;
        label.setAttribute('for', `card-checkbox${index}`);
        read.type = 'checkbox';
        read.id = `card-checkbox${index}`;
        read.checked = book.read;

        read.addEventListener('change', handleCardCheckbox);

        icon.classList.add('fa-solid', 'fa-trash');
        deleteBtn.appendChild(icon);
        deleteBtn.addEventListener('click', deleteBook);
        deleteBtn.classList.add('delete');

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

    }

    function addBook(obj) {
        const newBook = new Book(
            obj.title,
            obj.author,
            obj.pages,
            'read' in obj ? true : false
        )
        library.push(newBook);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataObj = Object.fromEntries(formData.entries());
        addBook(dataObj);
        displayBooks();
        form.reset();
        dialog.close();
    }

    function init() {
        addBtn.addEventListener('click', () => dialog.showModal());
        closeBtn.addEventListener('click', () => dialog.close());
        form.addEventListener('submit', handleFormSubmit);

        library.push(new Book('The Hobbit', 'J.R.R Tolkien', 295, false));
        library.push(new Book('Atomic Habits', 'James Clear', 306, true));
        library.push(new Book('Other Book', 'The man', 420, false));

        displayBooks();
    }

    return { init };

})();

MyApp.init();

