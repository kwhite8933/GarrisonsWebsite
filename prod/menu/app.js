(function(){
	var app = angular.module('garrisons', []);

	app.controller("MainController", ['$scope', '$http', function($scope, $http){
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
      console.log($scope.appetizers[0]);
    });

    // Updates the current appetizer's name
    // DOES NOT CHANGE THE DESCRIPTION OR PRICE
    $scope.updateAppetizerName = function(index){
      $http({
        method: "POST",
        url: "updateAppetizerName.php",
        dataType: 'json',
        data: $.param({
          'id': $scope.appetizers[index].id,
          'name': $scope.appetizers[index].name
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
        url: "updateAppetizerDescription.php",
        dataType: 'json',
        data: $.param({
          'id': $scope.appetizers[index].id,
          'description': $scope.appetizers[index].description
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
        url: "updateAppetizerPrice.php",
        dataType: 'json',
        data: $.param({
          'id': $scope.appetizers[index].id,
          'price': $scope.appetizers[index].price
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
        url: "deleteAppetizer.php",
        dataType: 'json',
        data: $.param({
          //TODO: Put all data here, use hours/app.js as a template for posting json objects to php
          'id': $scope.appetizers[index].id
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("success");
        console.log(res);
        //console.log(JSON.parse(res.data));
      });
      $scope.onDelete(index);
      console.log($scope.onDelete);

    };

    /*this.addSide = function(index){
      if( this.name === "" || this.price === "" ){
        return;
      }
      else if( index === -1 ){
        sideDishes.push({name: this.name, price: this.price});
      }
      else{
        sideDishes.splice(index, 0, {name: this.name, price: this.price});
      }
      this.name = '';
      this.price = '';
    };*/

    // example on how to edit a value on the fly, refractor for own code
    this.editAppName = function(index){
      appetizers[index].description = index;
    };

    this.deleteAppName = function(index){
      appetizers.splice( index, 1 );
    };

	}]);

  app.controller('addAppetizerController', ['$http', function($http){
    this.showForm = true;
    this.addName = "";
    this.addDescription = "";
    this.addprice = "";

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
      console.log(this.addDescription);
      $http({
        method: "POST",
        url: "addAppetizer.php",
        dataType: 'json',
        data: $.param({
          'name': this.addName,
          'description': this.addDescription,
          'price': this.addPrice
        }),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(res){
        console.log("success");
        console.log(res);
      });
      // hides the form that add the appetizer
      this.showForm = true;
    };

  }]);

  app.directive('appetizerList', function(){
    return{
      rectrict: 'AE',
      templateUrl: "appetizerList.html"
    };
  });

  /*app.controller('addSideController', function(){
    this.showForm = true;

    this.toggle = function(){
      this.showForm = !this.showForm;
    };

  });
  app.directive('sidesList', function(){
    return{
      rectrict: 'AE',
      templateUrl: "sidesList.html"
    };
  });
*/
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