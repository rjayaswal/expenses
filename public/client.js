var myApp = angular.module('app', []);

myApp.controller('homeCtrl', function($http, $scope) {
    $scope.username = 'gaurav@test.com';
    $scope.pwd = 'test123';

    getExpense();

    console.log('Login: ' + $scope.username + ' ' + $scope.pwd);

    function getExpense() {
        $http.get("/expenses").then(function(response) {
            $scope.items = response.data;
        });
    };

    $scope.addExpense = function(item) {
        var row = {
            username: $scope.username,
            amount: item.amount,
            desc: item.desc
        }
        $scope.items.push(item);
        $scope.item = '';
        $http.post('/add', {
            'row': row
        }).success(function() {
            console.log('Item Saved');
        });
    }; //end of addExpense

});