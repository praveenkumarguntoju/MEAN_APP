
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
	console.log($routeProvider);
	debugger;
    $routeProvider
    .when("/", {
      templateUrl: 'app/header.html',
       controller : "myCtrl"       
    }).when("/details",{
    	templateUrl: 'app/details.html'
    }) 
    
});