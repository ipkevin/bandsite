# Band Site - Sprint 3

Band Site project from BrainStation Web Dev Bootcamp.  Vancouver Feb 2023.

## Technologies Used
React, Node, Express, HTML5, CSS3, Knex.js, SQL, Web APIs

## Note on Styling

The page was styled to match the mockups at the below widths: 

* Mobile - 320px
* Tablet - 768px
* Desktop - 1280px

Specific styling choices:
* Hero Title scales continuously at smaller screen sizes: 
    * I matched the mockup at 320p, but then scaled the title in the hero banner up continuously until it hit the tablet breakpoint.  It just looks better to have it scaling up at the smaller viewport sizes.
* Hero Banner scales but has a max height: 
    * The hero banner images scales up in size continously until it hits a maximum height. Then it stops growing vertically as otherwise it would look too huge and push content down to below the fold after a certain point.
* Content Area has a max width:
    * I limited the max width of the content area (images & text) to 1735px so that it would remain manageable on super wide screens. However, the background colors & images continue to extend with the screen for aesthetic reasons.

## Installation

Clone the repo and open index.html in a web browser.
