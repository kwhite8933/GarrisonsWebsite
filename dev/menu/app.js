(function(){
	var app = angular.module('garrisons', []);

	app.controller("MainController", ['$scope', '$http', function($scope, $http){
    // initializes the array of appetizers;
    $scope.appetizers = {};

    // default values for addition of an appetizer
    $scope.showForm = true;
    $scope.addName = "";
    $scope.addDescription = "";
    $scope.addprice = "";

    // toggles whether or not the form to add an appetizer is shown
    // showForm is boolean and every time toggle is called, the form data gets reset
    $scope.toggle = function(){
      $scope.showForm = !this.showForm;
      $scope.addName = "";
      $scope.addDescription = "";
      $scope.addPrice = "";
    };
    //this.menuAppetizers = appetizers;
    //this.menuSides = sideDishes;

		/*this.addAppetizer = function(index){
      if( this.name === "" || this.description === "" || this.price === "" ){
        return;
      }
			else if( index === -1 ){
        appetizers.push({name: this.name, description: this.description, price: this.price});
			}
      else{
        appetizers.splice(index, 0, {name: this.name, description: this.description, price: this.price});
      }
      this.name = '';
			this.description = '';
			this.price = '';
		};*/

    // get weekly hours from the database
    $http.get('appetizerList.php').then(function(data){
      $scope.appetizers = data.data;
      console.log($scope.appetizers);
    });

    // Updates the current appetizer's name
    // DOES NOT CHANGE THE DESCRIPTION OR PRICE
    $scope.updateAppetizerName = function(index){
      $http({
        method: "POST",
        url: "updateAppetizer.php",
        dataType: 'json',
        data: $.param({
          'id': $scope.appetizers[index].id,
          'name': $scope.appetizers[index].name,
          'field': "name"
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("success");
        console.log(res);
        //console.log(JSON.parse(res.data));
      });
    };

    // Updates the current appetizer's Description
    // DOES NOT CHANGE THE NAME OR PRICE
    $scope.updateAppetizerDesc = function(index){
      $http({
        method: "POST",
        url: "updateAppetizer.php",
        dataType: 'json',
        data: $.param({
          'id': $scope.appetizers[index].id,
          'description': $scope.appetizers[index].description,
          'field': "description"
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("success");
        console.log(res);
        //console.log(JSON.parse(res.data));
      });
    };

    // Updates the current appetizer's price
    // DOES NOT CHANGE THE NAME OR DESCRIPTION
    $scope.updateAppetizerPrice = function(index){
      $http({
        method: "POST",
        url: "updateAppetizer.php",
        dataType: 'json',
        data: $.param({
          'id': $scope.appetizers[index].id,
          'price': $scope.appetizers[index].price,
          'field': "price"
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("success");
        console.log(res);
        //console.log(JSON.parse(res.data));
      });
    };

    //TODO: Find a better way to delete a specific item
    //This method deletes successfully but not on the fly(requires page refresh)
    //Need to delete so that the item gets removed immediately
    $scope.deleteAppetizer = function(index){
      $http({
        method: "POST",
        url: "updateAppetizer.php",
        dataType: 'json',
        data: $.param({
          //TODO: Put all data here, use hours/app.js as a template for posting json objects to php
          'id': $scope.appetizers[index].id,
          'field': "delete"
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("success");
        //console.log(res);
        //console.log(JSON.parse(res.data));
        $scope.appetizers.splice(index,1);
      });
      
    };

    // Adds appetizer to the database (name, description, price)
    // id for the appetizer is auto incremented such that each appetizer is unique
    // for insertion, deletion, and updating of database
    $scope.addAppetizer = function(index){
      if( index === undefined ){
        index = $scope.appetizers.length;
      }
      console.log(index);
      $http({
        method: "POST",
        url: "updateAppetizer.php",
        dataType: 'json',
        data: $.param({
          'name': $scope.addName,
          'description': $scope.addDescription,
          'price': $scope.addPrice,
          'field': "add"
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("success");
        console.log(res);
        console.log(res.data.name);
        $scope.appetizers.splice(index, 0, {name: res.data.name, description: res.data.description, price: res.data.price});
      });
      // hides the form that add the appetizer
      $scope.showForm = true;
    };
	}]);

  /*app.controller('addAppetizerController', ['$scope','$http', function($scope, $http){
    
    // default values for addition of an appetizer
    this.showForm = true;
    this.addName = "";
    this.addDescription = "";
    this.addprice = "";

    // toggles whether or not the form to add an appetizer is shown
    // showForm is boolean and every time toggle is called, the form data gets reset
    this.toggle = function(){
      this.showForm = !this.showForm;
      this.addName = "";
      this.addDescription = "";
      this.addPrice = "";
    };

    // Adds appetizer to the database (name, description, price)
    // id for the appetizer is auto incremented such that each appetizer is unique
    // for insertion, deletion, and updating of database
    this.addAppetizer = function(index){
      if( index === undefined ){
        index = $scope.appetizers.length;
      }
      console.log(index);
      $http({
        method: "POST",
        url: "updateAppetizer.php",
        dataType: 'json',
        data: $.param({
          'name': this.addName,
          'description': this.addDescription,
          'price': this.addPrice,
          'field': "add"
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("success");
        console.log(res);
        console.log(res.data.name);
        $scope.appetizers.splice(index, 0, {name: res.data.name, description: res.data.description, price: res.data.price});
      });
      // hides the form that add the appetizer
      this.showForm = true;
    };

  }]);*/

  // displaces the html required to view the list of appetizers for better readability of code
  app.directive('appetizerList', function(){
    return{
      rectrict: 'AE',
      templateUrl: "appetizerList.html"
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