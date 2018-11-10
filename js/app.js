
/* Model - where all the data is stored both from the server and the user */

let model = {   /*model is a simple object literal with Current cat set to null and with cats - vary large array of objects, each one represents a cat */
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'KsushaKittenPlaysMouse',
            imgSrc : 'img/1.jpg',
            imgAttribution : ''
        },
        {
            clickCount : 0,
            name : 'KsushaOnLaptop',
            imgSrc : 'img/2.jpg',
            imgAttribution : ''
        },
        {
            clickCount : 0,
            name : 'KsushaKittenBlueEyes',
            imgSrc : 'img/3.jpg',
            imgAttribution : ''
        },
        {
            clickCount : 0,
            name : 'KsushaFluffy',
            imgSrc : 'img/4.jpg',
            imgAttribution : ''
        },
        {
            clickCount : 0,
            name : 'Grace',
            imgSrc : 'img/5.jpg',
            imgAttribution : ''
        },
        {
            clickCount : 0,
            name : 'GraceReturn1',
            imgSrc : 'img/6.jpg',
            imgAttribution : ''
        },
        {
            clickCount : 0,
            name : 'GraceReturn2',
            imgSrc : 'img/7.jpg',
            imgAttribution : ''
        }
    ]
};


/* Octopus or Controller- where all functions are stored*/

let controller = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};


/* View  - where all ui elements are rendered and stored*/

let catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(e){
            controller.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = controller.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

let catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        //var cat, elem, i;
        // get the cats we'll be rendering from the controller
        let cats = controller.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (let i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            let elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(cat) {
                return function() {
                    controller.setCurrentCat(cat);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
controller.init();
