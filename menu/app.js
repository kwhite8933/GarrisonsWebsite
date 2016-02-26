(function(){
	var app = angular.module('garrisons', []);

	app.controller("MainController", function(){
		this.menu = menuItems;

		this.addAppetizer = function(index){
      if( this.name === "" || this.description === "" || this.price === "" ){
        return;
      }
			else if( index === -1 ){
        menuItems.push({name: this.name, description: this.description, price: this.price});
			}
      else{
        menuItems.splice(index, 0, {name: this.name, description: this.description, price: this.price});
      }
      this.name = '';
			this.description = '';
			this.price = '';
		};

    // example on how to edit a value on the fly, refractor for own code
    this.editName = function(index){
      menuItems[index].description = index;
    };

    this.deleteName = function(index){
      menuItems.splice( index, 1 );
    };

	});

  app.controller('addAppetizerController', function(){
    this.showForm = true;

    this.toggle = function(){
      this.showForm = !this.showForm;
    };

  });

  // Array of appetizers and their values
  var menuItems = [
  	{
  		name: "Garrison's Sampler",
  		description: "An assortment of buffalo tenders, fried mozzerella, and potato skins.",
  		price: 10.99
  	},
  	{
  		name: "Sauteed Artichoke Hearts",
  		description: "Sauteed in a white wine, lemon sauce.  Topped with diced tomatoes, basil, and parmesean cheese.",
  		price: 8.99
  	},
  	{
  		name: "Potato Skins",
  		description: "Topped with cheddar and monterey jack cheese, bacon, and scallions.",
  		price: 8.99
  	},
  	{
  		name: "Seafood Stuffed Mushrooms",
  		description: "Fresh mushroom caps stuffed with a fresh seafood blend.",
      upgrade: "Upgrade with cheese, just add " + 0.99 + " cents.",
  		price: 9.99
  	},
  	{
  		name: "Shrimp Cocktail",
  		description: "Served with cocktail sauce.",
  		price: 11.99
  	},
  	{
  		name: "Hand Breaded Onion Rings",
  		description: "A large basket of golden onion rings.",
  		price: 6.99
  	},
  	{
  		name: "Bacon Wrapped Sea Scallops",
  		description: "Fresh sea scallops, wrapped in bacon and served with maple syrup.",
  		price: 12.99
  	},
  	{
  		name: "Sauteed Mussels",
  		description: "Fresh Prince Island mussels, sauteed in a white wine sauce, parmesean cheese, and plum tomatoes.",
  		price: 8.99
  	},
  	{
  		name: "Fried Mozzerella",
  		description: "Deep fried and served with marinara sauce.",
  		price: 8.99
  	},
  	{
  		name: "Fried Calamari",
  		description: "Deep fried, served Rhode Island style, with cherry peppers, garlic, lemon, salt, and pepper.",
  		price: 9.99
  	},
  	{
  		name: "Home Made Kettle Chips",
  		description: "A generous portion of hand-cut, deep fried potato chips.",
  		price: 5.99
  	},
  	{
  		name: "Buffalo Tenders",
  		description: "Boneless chicken tenders, tossed in a spicy buffalo sauce. Served with bleu cheese dressing.",
  		price: 9.99
  	},
  	{
  		name: "Golden Tenders",
  		description: "Bonless chicken tenders tossed in a honey mustard BBQ sauce.",
  		price: 9.99
  	},
  	{
  		name: "Nachos",
  		description: "Topped with cheddar and monterey jack cheese, diced tomatoes, red onions, black olives, and jalapeno peppers.",
  		upgrade: "Add Chicken for " + 2.00 + ".",
  		price: 8.99
  	}
  ];
})();

$(document).ready( function(){

  var date = new Date();
  //var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var daysOfWeek = [
    {
      day: "Sunday",
      hours: "11 AM - Midnight"
    },
    {
      day: "Monday",
      hours: "11 AM - Midnight"
    },
    {
      day: "Tuesday",
      hours: "11 AM - Midnight"
    },
    {
      day: "Wednesday",
      hours: "11 AM - Midnight"
    },
    {
      day: "Thursday",
      hours: "11 AM - 1 AM"
    },
    {
      day: "Friday",
      hours: "11 AM - 1 AM"
    },
    {
      day: "Saturday",
      hours: "11 AM - 1 AM"
    }
  ];

  var day = date.getDay();
  var hours = daysOfWeek[day].hours;

  $("#todaysHours").append( "<p>Today's Hours:  " + daysOfWeek[day].hours + "</p>" );

});