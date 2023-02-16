
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
console.log(formElem);

formElem.addEventListener('submit',handleSubmit);
// formElem.addEventListener('submit', event => {
//     event.preventDefault();
//     handleSubmit(event);

    // sanitize & validate
    // pass to add to db function if it's good
    // update the html
// });


// Handles form submission. Adds form data to the db, then calls
// other func to update display of comments on the page
function handleSubmit(event){
    event.preventDefault();

    // Create & populate a new object with the submitted data
    const newEntry = {};
    newEntry.name = event.target.name.value; // data.get('name-form');
    newEntry.date = new Date().toLocaleDateString(); // .toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ; // "dummy-01"; // use new Date obj here
    newEntry.comment = event.target.message.value;
    console.log(newEntry); // REMOVE ME

    // add the new data object into the comments 'db' array
    commentsDB.unshift(newEntry);
    console.log(commentsDB); // REMOVE ME

    // add posts to page display
    updateComments();
    event.target.reset();
}


// Page element to which we will add comments
const commentsElem = document.querySelector(".comments__list");

// Refreshes display of comments on page with latest comments
function updateComments(){
    if (commentsDB.length > 0) {

        // clear the comments__items if they are not hte form (need to add anotehr class to id that)
        clearList();

        // now create all of the html for a comment & add the data to it
        commentsDB.forEach( element => {
            console.log(element,"-> in db");
            // Create name & date elements & add them to their parent
            let elemA = document.createElement("div");
            elemA.classList.add("comments__post-header");
            let elemB = document.createElement("p");
            elemB.classList.add("comments__post-name");
            elemB.innerText = element.name;
            elemA.appendChild(elemB);
            console.log("elem a: ", elemA.innerHTML);
            elemB = document.createElement("p");
            elemB.classList.add("comments__post-date");
            elemB.innerText = element.date;
            elemA.appendChild(elemB);
            console.log("elem a: ",elemA.innerHTML);

            // Create comment element, then add name/date/comment to new parent
            elemB = document.createElement("div");
            elemB.classList.add("comments__copy");  // new parent
            elemB.appendChild(elemA);  // appended name & date to parent
            console.log("elemB: ",elemB.innerHTML);
            elemA = document.createElement("p");
            elemA.classList.add("comments__post-body");
            elemA.innerText = element.comment;
            elemB.appendChild(elemA); // appended comment to parent
            console.log("elemB: ",elemB.innerHTML);

            // Add above element to the top level comments__item div
            elemA = document.createElement("div");
            elemA.classList.add("comments__item");
            elemA.appendChild(elemB); 
            console.log("elemA: ",elemA.innerHTML);

            // Add image element to top level div
            elemB = document.createElement("img");
            elemB.classList.add("comments__image");
            elemB.setAttribute("src","./assets/Images/profile-blank.png");
            elemB.setAttribute("alt","commenter image");
            elemA.insertBefore(elemB, elemA.firstChild); // insert <img> before other details
            console.log("elem a: ",elemA);
            
            // Finally apprend new comment element to the list on the page
            commentsElem.appendChild(elemA);
        });
    } else {
        alert('no comments in the db!');
    }
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


clearList();
updateComments();