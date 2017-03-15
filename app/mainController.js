

app.controller('myCtrl', function($scope,$http, $location,$rootScope) {
	$scope.message = "John";
	$scope.totalData = [];

    $scope.createData = {
    	title:"",
    	author:"",
    	description:""
    }
$scope.create = function (event) {
    debugger;
    $rootScope.register =  true;
    $location.path( "/register" );
}
$scope.saveData = function(event){
	console.log($scope);
      $http({
        url: '/app',
        method: "POST",
        data: { action:"create",data:$scope.createData }
    })
    .then(function(response) {
            // success
            debugger;
            alert(response.data.confirm);
           $scope.totalData = response.data.createdData;
            // $location.path( "/details" );

    }, 
    function(response) { // optional
            // failed
            debugger;
    });
   }

    });