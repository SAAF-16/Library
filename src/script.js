class Book {

    constructor(title,pages,description,year,author,genre) { 
        this.title=title;
        this.pages=pages;
        this.description=description;
        this.year=year;
        this.author=author;
        this.genre=genre;
     }
}
let myLibrary=[]
myLibrary[0] =new Book("Carillon",96,"long story of a short movie",1984,"John Doe","Drama")
myLibrary[1]=new Book("Jemba",42,"jemba jemba jemba is the real jemba jemba, jemba",2001,"Jemba!","Horror")
myLibrary[2]=new Book("The ride",157,"a long ride taking to never seen spaces",1895,"Carl Carlson","Drama")
myLibrary[3]=new Book("To the line",132,"everything in this book goes to the line",1995,"Krave Denson","Adventure")
myLibrary[4]=new Book("Unforgiven",204,"never forget never forgive",1999,"Zaza Zazovis","Horror")



function addToLibrary(book){
    if (!(book instanceof Book)) return false
   myLibrary[myLibrary.length]=book
}
