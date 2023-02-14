
const formElem = document.getElementById('comments-form');
console.log(formElem);

let commentsDB = [
    {name: "",
    comment: "",},
    {name: "",
    comment: ""},
    {name: "",
    comment: ""}
];

formElem.addEventListener('submit', event => {
    event.preventDefault();

    // sanitize
    // pass to add to db function if it's good
    // update the html
});

