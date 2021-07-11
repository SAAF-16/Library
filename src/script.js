class Book {

    constructor(title, pages, description, year, author, genre, read_pages) {
        this.title = title;
        this.pages = pages;
        this.description = description;
        this.year = year;
        this.author = author;
        this.genre = genre;
        this.read_pages = read_pages;
    }
}
let myLibrary;
if (!(localStorage.getItem('library'))) {// if the library is in the local storage loads it
    myLibrary = [];
} else {
    myLibrary = JSON.parse(localStorage["library"]);
}
let activeCategory = "all";
let searched_text = false;
let active_book;
let read_status;
let loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod lectus tellus, vel viverra dolor elementum sed. Praesent non nunc sed tortor laoreet pretium vitae vitae nisl. Cras magna enim, tincidunt sit amet ex nec, fermentum molestie neque.";
myLibrary[0] = new Book("Carillon", 96, loremIpsum, 1984, "John Doe", "Drama", 96);
myLibrary[1] = new Book("Jemba", 42, loremIpsum, 2001, "Jemba!", "Horror", 0);
myLibrary[2] = new Book("The ride", 157, loremIpsum, 1895, "Carl Carlson", "Drama", 157);
myLibrary[3] = new Book("To the line", 132, loremIpsum, 1995, "Krave Denson", "Adventure", 34);
myLibrary[4] = new Book("Unforgiven", 204, loremIpsum, 1999, "Zaza Zazovis", "Horror", 204);
myLibrary[5] = new Book("Bojack", 458, loremIpsum, 2005, "Zaza Zazovis", "Romance", 204);
myLibrary[6] = new Book("Magic Balls", 265, loremIpsum, 1001, "Carl Lewis", "Action", 54);
myLibrary[7] = new Book("The Glory", 203, loremIpsum, 1658, "Lit Mirrya", "Horror", 203);
myLibrary[8] = new Book("Zamnesia", 78, loremIpsum, 1864, "Juan Pablo", "Fantasy", 21);

let title = 0;
let pages = 0;
let description = 0;
let year = 0;
let author = 0;
let genre = 0;

const show_book = document.getElementById("show_book");
const show_title = document.getElementById("show_title");
const show_author = document.getElementById("show_author");
const show_pages = document.getElementById("show_pages");
const show_genre = document.getElementById("show_genre");
const show_years = document.getElementById("show_years");
const show_description = document.getElementById("show_description");
const delete_book = document.getElementById("delete_book");
const mark_read = document.getElementById("mark_read");
const read_pages = document.getElementById("read_pages");
const search_text = document.getElementById("search_text");
const book_categories = document.getElementById("book_categories");
const category_books = document.getElementById("category_books");
const search_results = document.getElementById("search_results");
const last_added = document.getElementById("last_added");
const button_add_new = document.getElementById("button_add_new");
const div_new_book = document.getElementById("div_new_book");
const overlay = document.getElementById("overlay");
const add_new_book = document.getElementById("add_new_book");
const bottom = document.getElementById("bottom");
const middle = document.getElementById("middle");
const total_books = document.getElementById("total_books");
const finished_books = document.getElementById("finished_books");
const unfinished_books = document.getElementById("unfinished_books");
const cancel = document.querySelectorAll(".cancel");

searched = (search_value, i) => {
    if (search_value == false) return false;
    return myLibrary[i].title.toLowerCase().includes(search_value.toLowerCase());
};




button_add_new.addEventListener('click', hideWindows());
search_text.addEventListener('input', show_search_results());
read_pages.addEventListener('change', update_read_status());
book_categories.addEventListener("click", update_active_category());
read_pages.addEventListener('input', check_valid_input());
delete_book.addEventListener('click', delete_selected_book());
add_new_book.addEventListener('click', add_selected_book());
mark_read.addEventListener('click', mark_as_read());
cancel.forEach(exit_window());

refreshBooks();

function refreshBooks() {
    updateBooks(last_added, 0); //updates the list of the book in the last added section
    updateBooks(category_books, 1); //updates the list of book in the categories section
}

function mark_as_read() {
    return () => {
        if (mark_read.checked == true) {
            read_pages.value = myLibrary[active_book].pages;
            myLibrary[active_book].read_pages = myLibrary[active_book].pages;
        } else {
            read_pages.value = 0;
        }
        refreshBooks();
    };
}

function updatelog() {
    let finished = 0;
    let unfinished = 0;
    total_books.textContent = `${myLibrary.length}`;
    for (i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].pages == myLibrary[i].read_pages) {
            finished++;
        } else {
            unfinished++;
        }
    }
    finished_books.textContent = finished;
    unfinished_books.textContent = unfinished;

}
let filled = () => {
    form = [title, pages, description, year, author, genre];
    for (let i = 0; i < form.length; i++) {
        if (form[i] == "") {
            console.log("vuoto");
            return false;
        }
    }
    console.log("pieno");
    return true;
};
function add_selected_book() {

    return () => {

        title = document.getElementById("bTitle").value;
        pages = document.getElementById("bPages").value;
        description = document.getElementById("bDescription").value;
        year = document.getElementById("bYear").value;
        author = document.getElementById("bAuthor").value;
        genre = document.getElementById("bGenre").value;
        if (!(filled())) return false;
        hideBookOverlay();
        addToLibrary(new Book(title, pages, description, year, author, genre));
        updateBooks(last_added, 0);
        // clearForm();


    };
}

function delete_selected_book() {
    return () => {
        myLibrary.splice(active_book, 1);
        updateBooks(last_added, 0);
        updateBooks(category_books, 1);
        hideBookOverlay();
    };
}

function exit_window() {
    return (canc) => {
        canc.addEventListener('click', () => {
            hideBookOverlay();

        });
    };
}

function check_valid_input() {
    return (e) => {
        if (e.target.value > myLibrary[active_book].pages) {
            e.target.value = myLibrary[active_book].pages;
        }
    };
}

function update_active_category() {
    return (e) => {
        document.querySelectorAll(".category").forEach((e) => {
            e.classList.remove("selected");
        });
        activeCategory = e.target.dataset.category;
        e.target.classList.add("selected");

        updateBooks(category_books, 1);
    };
}

function update_read_status() {
    return () => {
        if (myLibrary[active_book].pages == +read_pages.value) {
            mark_read.checked = true;
        } else {
            mark_read.checked = false;
        }
        myLibrary[active_book].read_pages = +read_pages.value;
        refreshBooks();
    };
}

function show_search_results() {
    return (e) => {

        if (e.target.value != "") {
            activeCategory = -1;
            searched_text = e.target.value;
            search_results.classList.remove('not_searching');
            updateBooks(search_results, 1);
        }

        if (e.target.value == "") {
            activeCategory = "all";
            search_results.classList.add("not_searching");
            searched_text = false;
        }
    };
}

function hideWindows() {
    return () => {
        div_new_book.classList.toggle("hidden");
        overlay.classList.toggle("hidden");
    };
}

function hideBookOverlay() {
    div_new_book.classList.add("hidden");
    overlay.classList.add("hidden");
    show_book.classList.add("hidden");
}

function clearForm() {
    div_new_book.reset();
}

function addToLibrary(book) {
    if (!(book instanceof Book)) return false;
    myLibrary[myLibrary.length] = book;
}

function updateBooks(doc, active) {
    doc.innerHTML = "";
    let book = 0;
    for (let i = myLibrary.length - 1; i >= 0; i--) {
        //the next if allows to use the same funcion for different purposes
        if ((active == 0) ||                                   // -if active is set to 0 we are just updating the last added books
            (activeCategory == "all") ||                       // -if = 'all' show all categories
            (`${myLibrary[i].genre}` == activeCategory) ||     // -show only desired category
            (searched(searched_text, i)))                      // -show only if contains searched text
        {
            book = document.createElement("div");
            book.classList.add("book");
            book.addEventListener("click", () => {
                active_book = i;
                show_title.textContent = `${myLibrary[i].title}`;
                show_author.textContent = `${myLibrary[i].author}`;
                show_pages.textContent = `${myLibrary[i].pages}`;
                show_genre.textContent = `${myLibrary[i].genre}`;
                show_years.textContent = `${myLibrary[i].year}`;
                show_description.textContent = `${myLibrary[i].description}`;
                read_pages.value = `${myLibrary[i].read_pages}`;
                if (myLibrary[i].read_pages == myLibrary[i].pages) {
                    mark_read.checked = true;
                } else {
                    mark_read.checked = false;
                }
                show_book.classList.toggle("hidden");
                overlay.classList.toggle("hidden");
                clearForm();

            });
            book.textContent = `${myLibrary[i].title}`;
            read_status = document.createElement("p");
            read_status.classList.add("status");
            if (myLibrary[i].read_pages == myLibrary[i].pages) {
                read_status.classList.add("finished");
            } else if (myLibrary[i].read_pages == 0) {
                read_status.classList.add("not_started");
            } else {
                read_status.classList.add("reading");
            }
            book.appendChild(read_status);
            doc.appendChild(book);
        }
    }
    if (active == 1) {          //if active=1 ( we are in the categories area) sort alphabetically
        [...doc.children]
            .sort((a, b) => {
                if (a.textContent > b.textContent) {
                    return 1;
                } else {
                    return -1;
                }
            })
            .forEach(node => doc.appendChild(node));


    }
    updatelog();
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

