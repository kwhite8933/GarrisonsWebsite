// AngularJS
(function(){
	var app = angular.module('garrisons', [] );

	app.controller('hoursController', ['$scope','$http', function($scope, $http){



		// get weekly hours from the database
		$http.get('hours.php').then(function(data){
			$scope.DailyHours = data.data;
			console.log($scope.DailyHours);
		});

		$scope.update = function(index){
			//console.log($scope.DailyHours[index][1]);
			console.log(index);
			console.log($scope.DailyHours[index].endTime);
			$http({
				method: "POST",
				url: "updateHours.php",
				dataType: 'json',
				data: $.param({
					'endTime': $scope.DailyHours[index].endTime,
					'id': index+1
				}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(res){
				console.log("success");
				//console.log(res);
				//console.log(JSON.parse(res.data));
			});
		}

		/*setTimeout( function() {
			console.log("timeout");
			$scope.update(2);
			console.log("returned");
		}, 3000);*/
	}]);
})();

// jQuery
$(document).ready( function(){

	// gets the day of the week to display hours on each day of week
	// This is not the overall hours but just the hours on one particular
	// day.  To be displayed at the top of the screen
	var date = new Date();
	var day = date.getDay(); // returns a value (0-6) cooresponding to Sunday - Saturday

	$.ajax({
		type: "GET",
		url: 'hours.php',
		dataType: 'json',
		success: function(data){
			console.log(data);
			//console.log(data.length);
			// Figures out which day of the week it is and displays that day's hours
			for( var i=1 ; i<=data.length ; i++ ){
				if( day === i ){
					console.log(data[i]);
					$("#todaysHours").append( "<p>" + data[i].weekday + " Hours: 11AM - " + data[i].endTime);
				}
			}
		}
	});
});