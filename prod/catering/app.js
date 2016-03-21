// AngularJS
(function(){

  var app = angular.module('garrisons', []);

  app.factory('httpData', function($http){
    /*return{
      updateName: function(){
        return $http({
          method: "POST",
          url: "updateAppetizer.php",
          dataType: 'json',
          data: $.param({
            'id': $scope.appetizers[index].id,
            'name': $scope.appetizers[index].name,
            'field': "name"
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
      }
    }*/
  });

  app.controller('MainController', ['$http', '$scope', function($http, $scope){

    $scope.partyPlatters = {};
    $scope.appetizers = {};

    // default values for addition of a platter
    $scope.showForm = true;
    $scope.addName = "";
    $scope.addDescription = "";
    $scope.addHTPrice = "";
    $scope.addFTPrice = "";

    // toggles whether or not the form to add a platter is shown
    // showForm is boolean and every time toggle is called, the form data gets reset
    $scope.toggle = function(){
      $scope.showForm = !this.showForm;
      $scope.addName = "";
      $scope.addDescription = "";
      $scope.addHTPrice = "";
      $scope.addFTPrice = "";
    };

    // get party platters from the database
    $http.get('catering.php').then(function(data){
      $scope.partyPlatters = data.data;
      console.log($scope.partyPlatters);
      console.log($scope.partyPlatters[0].name);
    });

    $http.get('cateringAppetizers.php').then(function(data){
      $scope.appetizers = data.data;
      console.log($scope.appetizers);
      console.log($scope.appetizers[0].name);
    });

    // Updates all fields in each party platter
    // field: always be name, description, half_tray, or full_tray
    // id for the platter is auto incremented such that each platter is unique
    // for insertion, deletion, and updating of database
    $scope.updatePartyPlatter = function(field, index){
      console.log(index);
      console.log("field: ", field);
      $http({
        method: "POST",
        url: "update.php",
        dataType: 'json',
        data: $.param({
          'id': $scope.partyPlatters[index].id,
          'name': $scope.partyPlatters[index].name,
          'description': $scope.partyPlatters[index].description,
          'half_tray': $scope.partyPlatters[index].half_tray,
          'full_tray': $scope.partyPlatters[index].full_tray,
          'field': field,
          'list': 'catering_party_platters'
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("update " + field + " successful");
        console.log(res);
        if( field == 'delete'){
          $scope.partyPlatters.splice(index, 1);
        }
        //console.log(JSON.parse(res.data));
      });

    };


    // Adds platter to the database (name, description, half_tray, full_tray)
    // id for the platter is auto incremented such that each platter is unique
    // for insertion, deletion, and updating of database
    $scope.addPartyPlatter = function(index){
      if( index === undefined ){
        index = $scope.partyPlatters.length;
      }
      console.log(index);
      $http({
        method: "POST",
        url: "update.php",
        dataType: 'json',
        data: $.param({
          'name': $scope.addName,
          'description': $scope.addDescription,
          'half_tray': $scope.addHTPrice,
          'full_tray': $scope.addFTPrice,
          'field': 'add',
          'list': 'catering_party_platters'
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("success");
        console.log("result: ", res);
        console.log("data: ", res.data);
        console.log("id: ", res.data.data.id);
        var pushData = res.data.data;
        // TODO: figure out best way to push to array (.push, .splice, etc...)
        // NOTES: could be cause of bug that inserts data in "index-1" position
        $scope.partyPlatters.push(pushData);
      });
      // hides the form that add the appetizer
      $scope.showForm = true;
    };

    // Updates all fields in each appetizer
    // field: always be name, description, half_tray, or full_tray
    // id for the platter is auto incremented such that each appetizer is unique
    // for insertion, deletion, and updating of database
    $scope.updateAppetizer = function(field, index){
      console.log(index);
      console.log("field: ", field);
      $http({
        method: "POST",
        url: "update.php",
        dataType: 'json',
        data: $.param({
          'id': $scope.appetizers[index].id,
          'name': $scope.appetizers[index].name,
          'description': $scope.appetizers[index].description,
          'half_tray': $scope.appetizers[index].half_tray,
          'full_tray': $scope.appetizers[index].full_tray,
          'field': field,
          'list': 'catering_appetizers'
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("update " + field + " successful");
        console.log(res);
        if( field == 'delete'){
          $scope.appetizers.splice(index, 1);
        }
        //console.log(JSON.parse(res.data));
      });

    };

    // Adds appetizer to the database (name, description, half_tray, full_tray)
    // id for the appetizer is auto incremented such that each appetizer is unique
    // for insertion, deletion, and updating of database
    $scope.addAppetizer = function(index){
      if( index === undefined ){
        index = $scope.appetizers.length;
      }
      console.log(index);
      $http({
        method: "POST",
        url: "update.php",
        dataType: 'json',
        data: $.param({
          'name': $scope.addName,
          'description': $scope.addDescription,
          'half_tray': $scope.addHTPrice,
          'full_tray': $scope.addFTPrice,
          'field': 'add',
          'list': 'catering_appetizers'
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("success");
        console.log("result: ", res);
        console.log("data: ", res.data);
        console.log("id: ", res.data.data.id);
        var pushData = res.data.data;
        // TODO: figure out best way to push to array (.push, .splice, etc...)
        // NOTES: could be cause of bug that inserts data in "index-1" position
        $scope.appetizers.push(pushData);
      });
      // hides the form that add the appetizer
      $scope.showForm = true;
    };


    /*$scope.updateAppetizer = function(index){
      // attempt at calling factory function here
      httpData.updateName().then(function(res){
        console.log("success");
        console.log(res);
        //console.log(JSON.parse(res.data));
      });
    }*/

  }]);

  app.directive('partyPlatters', function(){
      return{
        restrict: 'AE',
        templateUrl: "partyPlatterList.html"
      };
    });

  app.directive('appetizers', function(){
    return{
      restrict: 'AE',
      templateUrl: "appetizersList.html"
    };
  });

  // TODO: add directive for appetizers-list data

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