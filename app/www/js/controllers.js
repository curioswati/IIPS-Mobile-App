angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) { 
    
    $scope.data = {};

    $scope.register = function() {
      $state.go('register');
    };
    $scope.login = function() {
        $state.go('quote');
    }

    $scope.forgot = function() {
        alert("How could you forget your password");
    }
})

.controller('RegisterCtrl', function($scope, $state) {
    $scope.data = {};
 
    $scope.submit = function() {
        $state.go('login');
    };

    $scope.backToLogin = function() {
        $state.go('login');
    }
})