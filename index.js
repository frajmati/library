const gridBooks = document.querySelector(".books__grid");
const overlay = document.querySelector(".overlay");
const xMark = document.querySelector(".x-mark");
const btnAddBook = document.querySelector(".btn__add");
const formContainer = document.querySelector(".form__container");
formContainer.style.display = "none";
const form = document.querySelector(".form");

let formInputTitle = document.querySelector(".form__input--title");
let formInputAuthor = document.querySelector(".form__input--author");
let formInputPages = document.querySelector(".form__input--pages");
let formInputStatus = document.querySelector(".form__input--checkbox");


let title, author, pages, checkbox;

const btnSubmit = document.querySelector(".input__submit");

let green = "#01874B", red = "#FF3A19";

let titleValidation, authorValidation, pagesValidation, statusValidation;


function Book (name, author, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;

    Book.prototype.showInfo = function() {
        if (this.read == true) {
            return `${name} ${author} ${pages} read`;
        }
        else {
            return `${name} ${author} ${pages} not read`;
        }
    }
}

// Click en el botón de Add Book

btnAddBook.addEventListener("click", () => {
    openForm();
})

// Click en la X para cerrar el form

xMark.addEventListener("click", () => {
    closeForm();
})

function openForm() {
    overlay.classList.toggle("blur"); //para que el fondo se bluree
    formContainer.style.display = "flex"; //muestra el form
    formContainer.classList.add("active"); //para que esté por arriba del footer
}

function closeForm() {
    overlay.classList.toggle("blur"); //para que el fondo se bluree
    formContainer.style.display = "none"; //muestra el form
    formContainer.classList.remove("active"); //para que esté por arriba del footer
    resetForm();
}

function resetForm() {
    formInputTitle.value = "";
    formInputAuthor.value = "";
    formInputPages.value = "";
    formInputStatus.checked = true;
    titleValidation = false;
    authorValidation = false;
    pagesValidation = false;
    formInputTitle.style.outline = "1px solid #000";
    formInputAuthor.style.outline = "1px solid #000";
    formInputPages.style.outline = "1px solid #000";
}

let myLibrary = [];


form.addEventListener("submit", (e) => {

    if (titleValidation == true && authorValidation == true && pagesValidation == true) {

        

        e.preventDefault();
        title = formInputTitle.value;
        author = formInputAuthor.value;
        pages = formInputPages.value;
        checkbox = formInputStatus.checked;

        infoBook = [`"${title}"`, author, pages, checkbox];
        myLibrary.push(infoBook);
        console.log(myLibrary);



        //CREO EL LIBRO
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        let bookTitle = document.createElement("p");
        bookTitle.classList.add("book__title");
        bookTitle.textContent = `"${title}"`;


        let bookAuthor = document.createElement("p");
        bookAuthor.classList.add("book__author");
        bookAuthor.textContent = author;


        let bookPages = document.createElement("p");
        bookPages.classList.add("book__pages");
        bookPages.textContent = pages + " pages";


        let bookStatus = document.createElement("p");
        bookStatus.classList.add("book__status");
        if (checkbox) {
            bookStatus.textContent = "Read";
            bookStatus.style.color = green;
        }
        else {
            bookStatus.textContent = "Not read";
            bookStatus.style.color = red;
        }


        let bookRemove = document.createElement("p");
        bookRemove.classList.add("book__remove");
        bookRemove.setAttribute("data-index", (myLibrary.length - 1));
        bookRemove.innerText = "Remove";


        function updateRemoveButtonIndexes() {
            const removeButtons = document.querySelectorAll(".book__remove");
            removeButtons.forEach((button, index) => {
                button.setAttribute("data-index", index);
            });
        }
        

        bookRemove.addEventListener("click", (e) => {
            const indexToRemove = e.currentTarget.getAttribute("data-index");
            console.log(indexToRemove);
            myLibrary.splice(indexToRemove, 1);
            console.log(myLibrary);
            bookDiv.remove();
            updateRemoveButtonIndexes();
        })



        gridBooks.appendChild(bookDiv);
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(bookStatus);
        bookDiv.appendChild(bookRemove);




        closeForm();
    }




})






formInputTitle.addEventListener("input", () => {
    
    

    if (formInputTitle.value.length >= 2 && formInputTitle.value.length <= 100) {
        titleValidation = true;
        console.log("Title Validation: " + titleValidation);
        formInputTitle.style.outline = `2px solid ${green}`;
    }
    else {
        titleValidation = false;
        console.log("Title Validation: " + titleValidation);
        formInputTitle.style.outline = `2px solid ${red}`;
    }   
    
})

formInputAuthor.addEventListener("input", () => {
    
    if (formInputAuthor.value.length >= 2 && formInputAuthor.value.length <= 25) {
        authorValidation = true;
        formInputAuthor.style.outline = `2px solid ${green}`;
        console.log("Author Validation: " + authorValidation);
    }
    else {
        authorValidation = false;
        formInputAuthor.style.outline = `2px solid ${red}`;
        console.log("Author Validation: " + authorValidation);
    }  
})

formInputPages.addEventListener("input", () => {
    if (formInputPages.value >= 1 && formInputPages.value <= 1200) {
        pagesValidation = true;
        formInputPages.style.outline = `2px solid ${green}`;
        console.log("Pages Validation: " + pagesValidation);
    }
    else {
        pagesValidation = false;
        formInputPages.style.outline = `2px solid ${red}`;
        console.log("Pages Validation: " + pagesValidation);
    }  
})



