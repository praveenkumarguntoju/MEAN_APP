/**
 * Created by praveen.guntoju on 3/14/2017.
 */
app.controller('registCtrl',function ($scope,$http, $location,$rootScope) {
if(!$rootScope.register){
    $rootScope.register = true;
    $scope.driverDetails={
        "DRVFNAME":"",
        "DRVLNAME":"",
        "DRVAGE":"",
        "CARNUM":"",
        "CARNAME":"",
        "ADDRS1":"",
        "ADDRS2":"",
        "CITY":"",
        "ZIPCODE":"",
        "COUNTRY":"",
        "PHNO":""
    };
    $scope.saveDetails =function (event) {
        debugger;
        console.log($scope);
        $http({
            url: '/app',
            method: "POST",
            data: { action:"create",data:$scope.driverDetails }
        }).then(function(response) {
                    // success
                    debugger;
                    alert(response.data.confirm);
                    $scope.totalData = response.data.createdData;
                    // $location.path( "/details" );

                }, function(response) {
                   debugger;
                });
     };

}
});