class Book {

    constructor(title, pages, description, year, author, genre) {
        this.title = title;
        this.pages = pages;
        this.description = description;
        this.year = year;
        this.author = author;
        this.genre = genre;
    }
}
let activeCategory = "Horror";
const last_added = document.querySelector("#last_added");
const bAdd_new = document.getElementById("bAdd_new");
const div_new_book = document.getElementById("div_new_book");
const overlay = document.getElementById("overlay");
bAdd_new.onclick = () => {
    div_new_book.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
};


const book_categories = document.getElementById("book_categories");
book_categories.addEventListener("click", (e) => {
    activeCategory = e.target.dataset.category;
    updateBooks(category_books, 1);
});
const category_books = document.getElementById("category_books");



let myLibrary = [];
myLibrary[0] = new Book("Carillon", 96, "long story of a short movie", 1984, "John Doe", "Drama");
myLibrary[1] = new Book("Jemba", 42, "jemba jemba jemba is the real jemba jemba, jemba", 2001, "Jemba!", "Horror");
myLibrary[2] = new Book("The ride", 157, "a long ride taking to never seen spaces", 1895, "Carl Carlson", "Drama");
myLibrary[3] = new Book("To the line", 132, "everything in this book goes to the line", 1995, "Krave Denson", "Adventure");
myLibrary[4] = new Book("Unforgiven", 204, "never forget never forgive", 1999, "Zaza Zazovis", "Horror");




function addToLibrary(book) {
    if (!(book instanceof Book)) return false;
    myLibrary[myLibrary.length] = book;
}


updateBooks(last_added, 0);
updateBooks(category_books, 1);



function updateBooks(doc, active) {
    doc.innerHTML = "";
    for (let i = myLibrary.length - 1; i >= 0; i--) {
        if ((active == 0) || (activeCategory == "all") || (`${myLibrary[i].genre}` == activeCategory)) {
            let book = document.createElement("div");
            book.classList.add("book");
            book.addEventListener("click", (e) => {
                console.log(e.target);
            });
            book.textContent = `${myLibrary[i].title}`;
            doc.appendChild(book);
        }


    }
}
const cancel = document.getElementById("cancel");
cancel.onclick = function () {
    hideBookOverlay();
    clearForm();
};
const add_new_book = document.getElementById("add_new_book");
add_new_book.onclick = function () {

    let title = document.getElementById("bTitle").value;
    let pages = document.getElementById("bPages").value;
    let description = document.getElementById("bDescription").value;
    let year = document.getElementById("bYear").value;
    let author = document.getElementById("bAuthor").value;
    let genre = document.getElementById("bGenre").value;

    addToLibrary(new Book(title, pages, description, year, author, genre));
    updateBooks();

    hideBookOverlay();

    clearForm();
};
function hideBookOverlay() {
    div_new_book.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
}

function clearForm() {
    document.getElementById("bTitle").value = "";
    document.getElementById("bPages").value = "";
    document.getElementById("bDescription").value = "";
    document.getElementById("bYear").value = "";
    document.getElementById("bAuthor").value = "";
    document.getElementById("bGenre").value = "";
}

