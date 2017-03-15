
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
	console.log($routeProvider);
	debugger;
    $routeProvider
    .when("/", {
      templateUrl: 'app/header.html'
     }).when("/details",{
    	templateUrl: 'app/details.html'
    }).when("/register",{
        templateUrl: 'app/register.html',
        controller : "registCtrl"
    })

});