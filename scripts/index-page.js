const apiKey = "271cb087-128b-444b-a96a-3a321e8ed19a";
const apiUrl = "https://project-1-api.herokuapp.com/comments";


const formElem = document.getElementById('comments-form');

// Add eventListener for form submit
formElem.addEventListener('submit', event => {
    event.preventDefault();

    if (isFormValid(event)) { // validate input and if it's good, processing the data

        
        // Create & populate a new comment object with the submitted data
        const newEntry = {};
        newEntry.name = event.target.name.value; 
        newEntry.timestamp = new Date(); 
        newEntry.comment = event.target.message.value;

        // push the new comment object into the remote comments array
        axios.post(`${apiUrl}?api_key=${apiKey}`, {
            name: newEntry.name,
            comment: newEntry.comment
        }).then( (result) => {
            console.log("result from post new comment to api: ", result);

            // Refresh the comments on the page with all of the latest posts
            updateComments();

            // remove previously entered text from the form fields
            event.target.reset();

        }).catch( (error) => {
            console.log("error result from post new comment to api: ", error);
            alert("There was an error adding your comment to the DB. Please try again.");
        })

    }
});

// Function to validate input from form. Highlight fields that have a problem.
// Returns true if form fields are all valid, false otherwise
function isFormValid(event){

    let errorMsg = "";

    // Validate the name field
    if (event.target.name.value === "" || event.target.name.value.length < 2)  {
        errorMsg += "- Add a valid name (min 2 characters please)\n";
        event.target.name.classList.add("comments__input--error"); // add error color to form field
    } else {
        // if name field is fine, remove error color from field
        event.target.name.classList.remove("comments__input--error");
    }
    // Validate the message field
    if (event.target.message.value === "" || event.target.message.value.length < 4) {
        errorMsg += "- Add a message (min 4 characters please)\n";
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


// Function that refreshes display of comments on page with latest comments
function updateComments(){
    const commentsRaw = axios.get(`${apiUrl}/?api_key=${apiKey}`);
    commentsRaw.then((result) => {
        clearList(); // remove any existing comments on the page
        
        let commentsArr = result.data;
        commentsArr.sort((a,b) => { // sort comments newest first
            return b.timestamp - a.timestamp;
        });
        
        commentsArr.forEach(displayComment); // iterate thru comments and display them
    
    }).catch(error => {
        console.log("Error in fetching comments: ", error);
        alert("There was a problem fetching comments from the remote db")
    });
}


// Checks a date against current date.  If diff is <= 4 days, then return diff in days, hours, mins, or seconds.  Else return date in mm/dd/yyyy.
function getDateElapsed(date) {
    let time1 = new Date();
    let time2 = new Date(date);
    let timeDiff = time1 - time2;
    let fourDays = 1000*60*60*24*4;
    let oneDay = 1000*60*60*24;
    let oneHour = 1000*60*60;
    let oneMin = 1000*60;
    let oneSec = 1000;

    if (timeDiff < oneMin){
        return `${Math.round(timeDiff / oneSec)} seconds ago`;
    } else if (timeDiff < oneHour) {
        return `${Math.round(timeDiff / oneMin)} minutes ago`;
    } else if (timeDiff < oneDay) {
        return `${Math.round(timeDiff / oneHour)} hours ago`;
    } else if (timeDiff < fourDays) {
        return `${Math.round(timeDiff / oneDay)} days ago`;
    } else {
        // Return date in MM/DD/YYYY format,
        // but first check if need leading 0 added to date
        time2 = time2.toLocaleDateString();
        if (time2.indexOf("/") === 1) {
            return "0"+time2;
        } else {
            return time2;
        }
    }
}

// Function that takes in a comment object (eg from comments array) and adds it to the page.
// If comment posted less than 4 days ago, the date shown will dynamically change to time elapsed since posting.
function displayComment(element) {
    

    // Create name & date elements & add them to their parent
    const nameDateEl = document.createElement("div");
    nameDateEl.classList.add("comments__post-header");
    const nameEl = document.createElement("p");
    nameEl.classList.add("comments__post-name");
    nameEl.innerText = element.name;
    nameDateEl.appendChild(nameEl);
    const dateEl = document.createElement("p");
    dateEl.classList.add("comments__post-date");
    dateEl.innerText = getDateElapsed(element.timestamp); // use time elapsed fxn above to get time elapsed or date
    nameDateEl.appendChild(dateEl);

    // Create comment element, then add name/date/comment to new parent
    const commentBoxEl = document.createElement("div");
    commentBoxEl.classList.add("comments__copy");  // new parent
    commentBoxEl.appendChild(nameDateEl);  // appended name & date to parent
    const commentTextEl = document.createElement("p");
    commentTextEl.classList.add("comments__post-body");
    commentTextEl.innerText = element.comment;
    commentBoxEl.appendChild(commentTextEl); // appended comment to parent

    // Create container elem holding likes, like btn & delete btn
    const reactionElem = document.createElement("div");
    reactionElem.classList.add("comments__reactions");
    
    // create like button and add to container elem
    const likeButton = document.createElement("button");
    likeButton.classList.add("commentButton");
    likeButton.classList.add("likeButton");
    likeButton.innerText = "♥ Like";

    // create like counter and add to container elem
    const likeContainerElem = document.createElement("p");
    likeContainerElem.appendChild(likeButton);
    likeContainerElem.insertAdjacentHTML("beforeend", " | Likes: ");
    const likeValueElem = document.createElement("span");
    likeValueElem.classList.add("likes-value");
    likeValueElem.innerText = element.likes; // like count from api
    likeContainerElem.appendChild(likeValueElem);
    reactionElem.appendChild(likeContainerElem); // add like count & button to container
    
    // create delete button and add to container elem
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("commentButton");
    deleteButton.classList.add("deleteButton");
    deleteButton.innerText = "Delete";
    reactionElem.appendChild(deleteButton);

    // add like, delete to the comment element
    // elemB.appendChild(reactionElem);
    commentBoxEl.appendChild(reactionElem);

    // Add above comment element to the top level comments__item div
    const commentItemEl = document.createElement("div");
    commentItemEl.classList.add("comments__item");
    commentItemEl.appendChild(commentBoxEl); 

    // Add image element to top level div
    const commentImageEl = document.createElement("img");
    commentImageEl.classList.add("comments__image");
    commentImageEl.setAttribute("src","./assets/Images/profile-blank.png");
    commentImageEl.setAttribute("alt","commenter image");
    commentItemEl.insertAdjacentElement("afterbegin", commentImageEl); // insert <img> before other comment elements as per html structure
    // Page element to which we will add comments
    const commentsElem = document.querySelector(".comments__list");

    // Finally append new comment element to the list on the page
    commentsElem.appendChild(commentItemEl);

    // Add event listener on the area containing both delete & like buttons
    // Depending on exactly what is clicked, change behavior
    reactionElem.addEventListener('click', (event) => {

        // Delete button clicked
        if (event.target.classList.contains("deleteButton")) { 

             // Delete comment from remote DB. If works, then delete from page display as well.
            let delComm = axios.delete(`${apiUrl}/${element.id}?api_key=${apiKey}`);
            delComm.then( result => {
                event.target.parentNode.parentNode.parentNode.remove();
                console.log("success deleting comment using api: ", result);
            }).catch( error => {
                console.log("error deleting comment using api: ", error);
                alert("error deleting comment from remote DB")
            });
        }
        // Like button clicked
        if (event.target.classList.contains("likeButton")) {
            
            // Update likes on remote DB.  If successful, then update likes counter on the page.
            axios.put(`${apiUrl}/${element.id}/like?api_key=${apiKey}`).then( result => {
                
                //likeValueElem.innerText = result.data.likes;
                event.target.nextElementSibling.innerText = result.data.likes;
            }).catch( error => {
                console.log("error updating the comment likes thru api: ", error);
            });
        }
    });
}



// Function to remove comments from the page other than the input form 
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