

const formElem = document.getElementById('comments-form');
console.log(formElem);

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
    
    const data = new FormData(event.target);

    // Create & populate a new object with the submitted data
    const newEntry = {};
    newEntry.name = data.get('form-name');
    newEntry.date = "dummy-01"; // use new Date obj here
    newEntry.comment = data.get('form-comment');
    console.log(newEntry);

    // add the new data object into the comments 'db'
    commentsDB.splice(0,0,newEntry);
    console.log(commentsDB);

    // add posts to page display
    updateComments();
}

// Refreshes display of comments on page with latest comments
function updateComments(){
    if (commentsDB.length > 0) {

        // clear the comments__items if they are not hte form (need to add anotehr class to id that)
        //clearList();

        // now create all of the html for a comment & add the data to it
        commentsDB.forEach( element => {
            
            // create html element and add db data to it.
            let newComment = document.createElement('div');
            newComment.classList.add('comments__item');
            
            // apprend to comments list
        
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

setTimeout(clearList, 2000);
//clearList();