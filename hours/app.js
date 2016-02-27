var weeklyHours = [
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

(function(){
	var app = angular.module('garrisons', [] );

	app.controller('hoursController', function(){
		this.hours = weeklyHours;

		// example on how to edit a value on the fly, refractor for own code
    	this.editHours = function(index){
      		weeklyHours[index].hours = index;
    	};

	});

})();

$(document).ready( function(){

	var date = new Date();
	var day = date.getDay();
	var hours = weeklyHours[day].hours;

	console.log(day);
	$("#todaysHours").append( "<p>Today's Hours:  " + weeklyHours[day].hours + "</p>" );

});