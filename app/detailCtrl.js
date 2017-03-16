/**
 * Created by praveen.guntoju on 3/15/2017.
 */
app.controller('detailCtrl', function($scope,$http, $location,$rootScope,$route) {
    debugger;
    $scope.displayDetail = true;

    $scope.$on('editDetails', function (event, args) {
        debugger;
        $scope.action = args.action;
        console.log($scope.action);
    });
    $scope.driverDetails = '';
    $scope.init = function() {
        debugger;
       var data = $route.current.params;
        $http({
            url: '/app',
            method: "POST",
            data: { action:"getDetail",data:data.carno}
        }).then(function(response) {
            debugger;
            $scope.driverDetails = response.data.driverDetail;
            alert(response.data.confirm);
        }, function(response) {
            debugger;
        });


    }
    $scope.init();


});