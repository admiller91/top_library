//event listener for removing cards
const container = document.querySelector("#cards-section");

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
        //e.target is the div with class of remove

        //this is the div that needs to be deleted
        const cardToRemove = e.target.parentElement.parentElement.parentElement.parentElement;

        //this is the index in the myLibrary array to be removed
        const cardToRemoveIndex = parseInt(cardToRemove.getAttribute("data-index"));

        removeBookCard(cardToRemove);
        removeBook(cardToRemoveIndex);
      }
});

function removeBook(index) {
    delete myLibrary[index];
}

function removeBookCard(elem) {
elem.remove();
}


//change read status text when clicked
container.addEventListener('click', (e) => {
    if (e.target.classList.contains("read-status")) {

        const cardToChange = e.target;

        changeReadStatusOnCard(cardToChange);
        
        //get data-index attr from the card to get the index in myLibrary array
        const changeX = cardToChange.parentElement.parentElement.parentElement.parentElement;

        const statusToChangeIndex = parseInt(changeX.getAttribute("data-index"));

        changeReadStatusOnBook(myLibrary[statusToChangeIndex]);
    }
});

function changeReadStatusOnCard(card) {
    if (card.classList.contains("hasRead")) {
        card.classList.remove("hasRead");
        card.classList.add("hasNotRead");
    } else {
        card.classList.remove("hasNotRead");
        card.classList.add("hasRead");
    }
}

function changeReadStatusOnBook(obj) {
    (obj.readStatus == true) ? obj.readStatus = false : obj.readStatus = true;
}

//library array of book objects
let myLibrary = [];

function Book(title, author, pages, readStatus, tags) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.tags = tags;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${readStatus} read`; 
        console.log(`${title} by ${author}, ${pages} pages, ${readStatus} read`);
    }
}

function addBookToLibrary(title, author, pages, readStatus, tags) {
    let newBook = new Book(title, author, pages, readStatus, tags);
    myLibrary.push(newBook);
}

function displayBooks() {
    myLibrary.forEach(elem => {
        console.log(elem);
    });
}

//creates and displays appropriate divs with the data from the library array
function displayBookCards() {
    const container = document.querySelector("#cards-section");

    myLibrary.forEach(elem => {
        const card = document.createElement("div");
        card.classList.add("card");
    
        const cardColumns = document.createElement("div");
        cardColumns.classList.add("card-columns");
    
        const cardColumnsLeft = document.createElement("div");
        cardColumnsLeft.classList.add("card-column-left");
    
        const author = document.createElement("div");
        author.classList.add("author");
        author.textContent = elem.author;

        const title = document.createElement("div");
        title.classList.add("title");
        //console.log(elem.title);
        title.textContent = elem.title;

        const bookDetails = document.createElement("div");
        bookDetails.classList.add("book-details");
    
        const pages = document.createElement("div");
        pages.classList.add("pages");
        pages.textContent = `${elem.pages} pages`;
    
        const readStatusDiv = document.createElement("div");
        readStatusDiv.classList.add("read-status");
        if (elem.readStatus) {
            readStatusDiv.classList.add("hasRead");
            //readStatusDiv.textContent = "Read: Yes";
        } else {
            readStatusDiv.classList.add("hasNotRead");
            //readStatusDiv.textContent = "Read: No";
        }

        const changeStatus = document.createElement("div");
         changeStatus.classList.add("change-read-status");
        //changeStatus.setAttribute("id","change-read-status");
        changeStatus.textContent = "Change Read Status"
    
        const cardColumnsRight = document.createElement("div");
        cardColumnsRight.classList.add("card-column-right");
        //console.log(elem.tags);

        elem.tags.forEach(tag => {
            const tags = document.createElement("div");
            tags.classList.add("book-tags");
            tags.textContent = tag;
            cardColumnsRight.appendChild(tags);
        });

        bookDetails.appendChild(pages);
        bookDetails.appendChild(readStatusDiv);
        bookDetails.appendChild(changeStatus);

        cardColumnsLeft.appendChild(author);
        cardColumnsLeft.appendChild(title);
        cardColumnsLeft.appendChild(bookDetails);

        cardColumns.appendChild(cardColumnsLeft);
        cardColumns.appendChild(cardColumnsRight);

        card.appendChild(cardColumns);

        container.appendChild(card);
    });
}



function addSingleBookCard(titleParam, authorParam, pagesParam, statusParam, tagsArr, arrIndex) {
    const container = document.querySelector("#cards-section");
    
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = arrIndex;
    
        const cardColumns = document.createElement("div");
        cardColumns.classList.add("card-columns");
    
        const cardColumnsLeft = document.createElement("div");
        cardColumnsLeft.classList.add("card-column-left");
    
        const author = document.createElement("div");
        author.classList.add("author");
        author.textContent = authorParam;

        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = titleParam;

        const bookDetails = document.createElement("div");
        bookDetails.classList.add("book-details");
    
        const pages = document.createElement("div");
        pages.classList.add("pages");
        pages.textContent = `${pagesParam} pages`;
    
        const readStatusDiv = document.createElement("div");
        readStatusDiv.classList.add("read-status");
        if (statusParam) {
            readStatusDiv.classList.add("hasRead");
        } else {
            readStatusDiv.classList.add("hasNotRead");
        }

        const changeStatus = document.createElement("div");
         changeStatus.classList.add("remove");
        changeStatus.textContent = "Remove"
    
        const cardColumnsRight = document.createElement("div");
        cardColumnsRight.classList.add("card-column-right");

        tagsArr.forEach(tag => {
            const tags = document.createElement("div");
            tags.classList.add("book-tags");
            tags.textContent = tag;
            cardColumnsRight.appendChild(tags);
        });

        bookDetails.appendChild(pages);
        bookDetails.appendChild(readStatusDiv);
        bookDetails.appendChild(changeStatus);

        cardColumnsLeft.appendChild(author);
        cardColumnsLeft.appendChild(title);
        cardColumnsLeft.appendChild(bookDetails);

        cardColumns.appendChild(cardColumnsLeft);
        cardColumns.appendChild(cardColumnsRight);

        card.appendChild(cardColumns);

        container.appendChild(card);
   

}


// form functions

//event listner for form submition which adds the data from the form to the library array and calls the add single display card to display the new book

const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const pages = document.getElementById("pages").value;
    const readStatus = document.querySelector('input[name="has-read"]:checked').value
    let status = true;
    const tagsArr = ["Fantasy", "Fiction"];

    (readStatus === "yes") ? status = true : status = false;


    let arrIndex = myLibrary.length;

    addBookToLibrary(title, author, pages, status, tagsArr);
    addSingleBookCard(title, author, pages, status, tagsArr, arrIndex);
    clearTextFields();
});

function clearTextFields() {
    document.getElementById("author").value = "";
    document.getElementById("title").value = "";
    document.getElementById("pages").value = "";
}

