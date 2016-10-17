var app = angular.module('myApp', []);


app.controller('ivey', function($scope, okFine, $location) {
  $scope.data = {
    username: '',
    password: ''
  };
  $scope.allData = [];

  $scope.addData = function() {
    $scope.allData.push($scope.data);
    okFine.newUser($scope.data);
    $scope.data = {
      username: '',
      password: ''
    };
    $location.path('/youarehere');
  };
});


app.factory('okFine', function($http) {

  var newUser = function(user) {
    return $http.post('/api/users', user).then(function(res) {
      console.log(res);
    });
  };
  return {newUser: newUser};
});