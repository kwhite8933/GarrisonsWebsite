$(document).ready( function(){

	var date = new Date();
	
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

	var day = date.getDay();
	var hours = weeklyHours[day].hours;

	$("#todaysHours").append( "<p>Today's Hours:  " + weeklyHours[day].hours + "</p>" );

	$("textarea").keyup(function(e) {
    	while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
        	$(this).height($(this).height()+1);
    	};

	});

});