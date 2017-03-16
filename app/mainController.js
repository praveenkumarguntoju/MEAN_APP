

app.controller('myCtrl', function($scope,$http, $location,$rootScope) {
	$scope.message = "John";
	$scope.totalData = [];


$scope.editdetail = function (evt) {
    $scope.$broadcast('editDetails', { action: 'edit' });
}
$scope.driverList = function (event) {
          debugger;
    $http({
        url: '/app',
        method: "post",
        data: {action: "getData"}
    })
        .then(function (response) {
            debugger;
                alert(response.data.confirm);
                $scope.driverData = response.data.driverData;
                // $location.path( "/details" );
            },
            function (response) { // optional
                debugger;
            });
};
$scope.detailPage =function(drvData){
    debugger;
    var carno = drvData['CARNUM'];

    $location.path('/details/' + carno );
};



    $scope.createData = {
    	title:"",
    	author:"",
    	description:""
    }
$scope.create = function (event) {
    debugger;
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