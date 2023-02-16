

// The shows data
const concertList = [
{
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA"
},
{
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA "
},
{
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA "
},
{
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA"
},
{
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA "
},
{
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA"
}
];



// This builds a show info element and adds it to the existing list on the page
function displayShow(show) {

    // The element/location in the doc where new shows will be appended to
    // Could prob pass this in as a param, but why bother when rest of code 
    // is already so hardcoded to a particular block of html
    const parentElem = document.querySelector('.shows__list');

    // a single show element ('.shows__item'). Will be used to hold the details we are pulling from array.
    let containerElem = document.createElement('ul');
    containerElem.classList.add('shows__item');

    // Create date header & data
    let dateHeader = document.createElement('li');
    dateHeader.classList.add('shows__item-header');
    let dateData = document.createElement('li');
    dateData.classList.add('shows__item-copy','shows__item-copy--date');
    dateData.innerText = show.date;

    // create venue header and data
    let venueHeader = document.createElement('li');
    venueHeader.classList.add('shows__item-header');
    let venueData = document.createElement('li');
    venueData.classList.add('shows__item-copy','shows__item-copy--venue');
    venueData.innerText = show.venue;

    // create location header and data
    let locationHeader = document.createElement('li');
    locationHeader.classList.add('shows__item-header');
    let locationData = document.createElement('li');
    locationData.classList.add('shows__item-copy','shows__item-copy--location');
    locationData.innerText = show.location;

    // create the button (always the same, no dynamic info)
    let buttonElem = document.createElement('li');
    buttonElem.classList.add('shows__item-button');
    let buttonLink = document.createElement('a');
    buttonLink.classList.add('button','shows__item-link');
    buttonLink.setAttribute('href','#');
    buttonLink.innerText = "Buy Tickets";
    buttonElem.appendChild(buttonLink);

    // create a show element by appending all the show elements created above
    containerElem.appendChild(dateHeader);
    containerElem.appendChild(dateData);
    containerElem.appendChild(venueHeader);
    containerElem.appendChild(venueData);
    containerElem.appendChild(locationHeader);
    containerElem.appendChild(locationData);
    containerElem.appendChild(buttonElem);

    // Append element to the parent. A new show has been added to the list
    parentElem.appendChild(containerElem);
}

// Adds eventlisteners to the show elements to handle color change on click 
function addClickHandlers(){
    let shows = document.querySelectorAll('.shows__item');
    shows.forEach( (show) => {
        show.addEventListener('click',highlightClicked);
    });
}

// Adds & removes a highlight effect on any clicked row in shows list
function highlightClicked(event){

    const className = "shows__item--selected";

    if (event.currentTarget.classList.contains(className)) {
        // if clicking on already highlighted row, then remove highlight
        event.currentTarget.classList.remove(className);
    } else {
        // else first clear highlights from other rows
        let alreadyHighlighted = document.querySelectorAll(`.${className}`);
        if (alreadyHighlighted.length > 0) {
            alreadyHighlighted.forEach( (element) => {
                element.classList.remove(className);
            });
        }
        // finally add highlight to clicked row
        // use currentTarget instead of target to affect the element that had listener on it instead of any nested clicked elements
        event.currentTarget.classList.add('shows__item--selected');
    }   
}



/*** Setup the page ***/

// iterate thru the array and turn each show into an element on the page
concertList.forEach( aShow => {
    displayShow(aShow);
 });
 // add the event listeners to all shows rows so that they'll highlight when clicked.
 addClickHandlers();