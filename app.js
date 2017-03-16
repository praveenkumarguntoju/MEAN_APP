
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
	console.log($routeProvider);
	debugger;
    $routeProvider
    .when("/", {
      templateUrl: 'app/header.html'
     }).when("/details/:carno",{
    	templateUrl: 'app/details.html',
        controller: "detailCtrl"
    }).when("/register",{
        templateUrl: 'app/register.html',
        controller: "registCtrl"
    })

});