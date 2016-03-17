// AngularJS
(function(){

  var app = angular.module('garrisons', []);

  /*app.factory('getHttpData', function($http){
    return{
      getCateringData: function(){
        return $http.get('catering.php');
      }
    }
  });*/

  app.controller('MainController', ['$http', '$scope', function($http, $scope){

    $scope.partyPlatters = {};

    console.log("got here");

    // get party platters from the database
    $http.get('catering.php').then(function(data){
      $scope.partyPlatters = data.data;
      console.log($scope.partyPlatters);
      console.log($scope.partyPlatters[0].name);
    });

    /*getHttpData.getCateringData.then(function(res){
      console.log("result: ", res);
      $scope.partyPlatters = res;
    });*/

  }]);

  app.directive('partyPlatters', function(){
      return{
        restrict: 'AE',
        templateUrl: "partyPlatterList.html"
      };
    });

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
      //console.log(data);
      //console.log(data.length);
      // Figures out which day of the week it is and displays that day's hours
      for( var i=1 ; i<=data.length ; i++ ){
        if( day === i ){
          //console.log(data[i]);
          // FORMAT: Monday hours: 11AM - Midnight
          $("#todaysHours").append( "<p>" + data[i][1] + " Hours: 11AM - " + data[i][2]);
        }
      }
    }
  });
});