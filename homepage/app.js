(function(){
	var app = angular.module('garrisons', []);

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