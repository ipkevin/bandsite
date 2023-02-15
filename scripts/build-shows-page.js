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

// iterate thru the array and turn each show into an element
concertList.forEach( aShow => {
   displayShow(aShow);
});


// This builds a show info element and adds it to the existing list on the page
function displayShow(show) {

    // the element/location in the doc where new shows will be appended to
    // could prob pass this in as a param, but rest of code is already so hardcoded to a particular block of html
    const parentElem = document.querySelector('.shows__list');

    // a single show element ('.shows__item'). Will be used to hold the details we are pulling from array.
    let containerElem = document.createElement('ul');
    containerElem.classList.add('shows__item');
    //*** */ NEED TO ADD ONCLICK ATTRIBUTE HERE TO HANDLE THE CLICKS***//
    containerElem.setAttribute('onclick','highlightClicked()');

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

    // create the button (always the same)
    let buttonElem = document.createElement('li');
    buttonElem.classList.add('shows__item-button');
    let buttonLink = document.createElement('a');
    buttonLink.classList.add('button','shows__item-link');
    buttonLink.setAttribute('href','#');
    buttonLink.innerText = "Buy Tickets";
    buttonElem.appendChild(buttonLink);

    // create a show element by appending all the show info
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


// AddEventHandler on row click 


// ClickHandler 
// Find Clear any other active rows (querySelectAll on the active class, then remove class) 
// On the current event object, add the active class 
function highlightClicked(event){
    event.target.classList.add('shows__item--selected');
}