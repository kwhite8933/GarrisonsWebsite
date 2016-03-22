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
    $scope.salads = {};

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

    $http.get('cateringSalads.php').then(function(data){
      $scope.salads = data.data;
      console.log($scope.salads);
      console.log($scope.salads[0].name);
    })

    // Adds a catering item to the database (name, description, half_tray, full_tray)
    // id for the item is auto incremented such that each item is unique
    // for insertion, deletion, and updating of database
    // table: database table passed in from each *List.html file read from the database
    $scope.addItem = function(table,index){
      if( table == 'appetizers' ){
        var dbTable = "catering_appetizers";
        if( index === undefined ){
          index = $scope.appetizers.length;
        }
      }
      else if( table == 'partyPlatters' ){
        var dbTable = "catering_party_platters";
        if( index === undefined ){
          index = $scope.appetizers.length;
        } 
      }
      else if( table == 'salads' ){
        var dbTable = "catering_salads";
        if( index === undefined ){
          index = $scope.salads.length;
        }
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
          'list': dbTable
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("success");
        console.log("result: ", res);
        console.log("data: ", res.data);
        console.log("id: ", res.data.data.id);
        $scope.addName = "";
        $scope.addDescription = "";
        $scope.addHTPrice = "";
        $scope.addFTPrice = "";
        var pushData = res.data.data;
        // TODO: figure out best way to push to array (.push, .splice, etc...)
        // NOTES: could be cause of bug that inserts data in "index-1" position
        if( table == "appetizers" ){
          $scope.appetizers.push(pushData);
        }
        else if( table == "partyPlatters" ){
          $scope.partyPlatters.push(pushData);
        }
        else if( table == "salads" ){
          $scope.salads.push(pushData);
        }
      });
      // hides the form that add the appetizer
      $scope.showForm = true;
    };

    // Updates all fields in each catering item
    // field: always be name, description, half_tray, or full_tray
    // id for the platter is auto incremented such that each item is unique
    // for insertion, deletion, and updating of database
    // table: database table passed in from each *List.html file read from the database
    // field: represents which field fo the database to update (name, description, half tray price, or full tray price)
    $scope.update = function(table, field, index){
      console.log(index);
      console.log("field: ", field);
      if( table == "appetizers" ){
        var dbTable = "catering_appetizers";
        var postData = $scope.appetizers;
      }
      else if( table == "partyPlatters" ){
        var dbTable = "catering_party_platters";
        var postData = $scope.partyPlatters;
      }
      else if( table == "salads" ){
        var dbTable = "catering_salads";
        var postData = $scope.salads;
      }
      $http({
        method: "POST",
        url: "update.php",
        dataType: 'json',
        data: $.param({
          'id': postData[index].id,
          'name': postData[index].name,
          'description': postData[index].description,
          'half_tray': postData[index].half_tray,
          'full_tray': postData[index].full_tray,
          'field': field,
          'list': dbTable
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("update " + field + " successful");
        console.log(res);
        if( field == 'delete' && table == 'appetizers' ){
          $scope.appetizers.splice(index, 1);
        }
        else if( field == 'delete' && table == 'partyPlatters' ){
          $scope.partyPlatters.splice(index, 1);
        }
        else if( field == 'delete' && table == 'salads' ){
          $scope.salads.splice(index, 1);
        }
        //console.log(JSON.parse(res.data));
      });

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

  app.directive('salads', function(){
    return{
      restrict: 'AE',
      templateUrl: "saladsList.html"
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
      console.log("hours data: ", data);
      //console.log(data.length);
      // Figures out which day of the week it is and displays that day's hours
      for( var i=1 ; i<=data.length ; i++ ){
        if( day === i ){
          console.log("todays hours: ", data[i]);
          // FORMAT: Monday hours: 11AM - Midnight
          $("#todaysHours").append( "<p>" + data[i][1] + " Hours: 11AM - " + data[i][2]);
        }
      }
    }
  });
});