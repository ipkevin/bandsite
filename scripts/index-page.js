
// Comments Array
let commentsDB = [
{
    name: "Connor Walton",
    date: "02/17/2021",
    comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
},
{
    name: "Emilie Beach",
    date: "01/09/2021",
    comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
},
{
    name: "Miles Acosta",
    date: "12/20/2020",
    comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
}
];

const formElem = document.getElementById('comments-form');

// Add eventListener for form submit
formElem.addEventListener('submit', event => {
    event.preventDefault();

    if (isFormValid(event)) {
        // Create & populate a new comment object with the submitted data
        const newEntry = {};
        newEntry.name = event.target.name.value; // data.get('name-form');
        newEntry.date = new Date().toLocaleDateString(); // .toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ; // "dummy-01"; // use new Date obj here
        newEntry.comment = event.target.message.value;

        // push the new comment object into the comments array
        commentsDB.unshift(newEntry);

        // Refresh the comments on the page with all of the latest posts
        updateComments();

        // remove previously entered text from the form fields
        event.target.reset();
    }
});

// Validate input from form. Highlight fields that have a problem.
// Returns true if form fields are all valid, false otherwise
function isFormValid(event){

    let errorMsg = "";

    // Validate the name field
    if (event.target.name.value === "" || event.target.name.value.length < 2) {
        errorMsg += "- Add a valid name (2 letters or more)\n";
        event.target.name.classList.add("comments__input--error");
    } else {
        // if name field is fine, remove error color from field
        event.target.name.classList.remove("comments__input--error");
    }
    // Validate the message field
    if (event.target.message.value === "" || event.target.message.value.length < 4) {
        errorMsg += "- Add a message (4 letters or more)\n";
        event.target.message.classList.add("comments__input--error");
    } else {
        event.target.message.classList.remove("comments__input--error");
    }

    // Alert user which fields have a problem
    if (errorMsg === "") {
        return true;
    } else {
        errorMsg = "There was a problem with your submission:\n\n"+errorMsg;
        alert(errorMsg);
        return false;
    }
}


// Refreshes display of comments on page with latest comments
function updateComments(){
    if (commentsDB.length > 0) {

        // clear the comments__items already on the page outside of the form
        clearList();

        // Now iterate thru all of the comments from the DB and display them to the page
        commentsDB.forEach(displayComment);

    } else {
        alert('no comments in the db!');
    }
}



// Takes in a comment object (eg from comments array) and adds it to the page
function displayComment(element) {
    
    // Create name & date elements & add them to their parent
    let elemA = document.createElement("div");
    elemA.classList.add("comments__post-header");
    let elemB = document.createElement("p");
    elemB.classList.add("comments__post-name");
    elemB.innerText = element.name;
    elemA.appendChild(elemB);
    elemB = document.createElement("p");
    elemB.classList.add("comments__post-date");
    elemB.innerText = element.date;
    elemA.appendChild(elemB);

    // Create comment element, then add name/date/comment to new parent
    elemB = document.createElement("div");
    elemB.classList.add("comments__copy");  // new parent
    elemB.appendChild(elemA);  // appended name & date to parent
    elemA = document.createElement("p");
    elemA.classList.add("comments__post-body");
    elemA.innerText = element.comment;
    elemB.appendChild(elemA); // appended comment to parent

    // Add above element to the top level comments__item div
    elemA = document.createElement("div");
    elemA.classList.add("comments__item");
    elemA.appendChild(elemB); 

    // Add image element to top level div
    elemB = document.createElement("img");
    elemB.classList.add("comments__image");
    elemB.setAttribute("src","./assets/Images/profile-blank.png");
    elemB.setAttribute("alt","commenter image");
    elemA.insertBefore(elemB, elemA.firstChild); // insert <img> before other comment elements as per html structure
    
    // Page element to which we will add comments
    const commentsElem = document.querySelector(".comments__list");

    // Finally append new comment element to the list on the page
    commentsElem.appendChild(elemA);
}



// Removes comments from the page other than the input form 
function clearList(){
    const currComments = document.querySelectorAll('.comments__item');

    if (currComments.length > 0){
        currComments.forEach( element => {
            if (!element.classList.contains("comments__item--first-form")) {
                // if not the post comment form, then remove element
                element.remove();
            }
        });
    }
}


// On initial load of page, remove any dummy comments and post comments from the DB
updateComments();