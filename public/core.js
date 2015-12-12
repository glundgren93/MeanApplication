var todoApp = angular.module('todoApp', []);

todoApp.controller('mainController', ['$scope', '$filter', '$http', function($scope, $filter, $http) {
  $scope.formData = {};
  $scope.todos = {};

  $scope.getAll = function() {
    $http.get('/api/todos')
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.error("Error: " + data);
      });
  };

  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.todos = data;
      })
      .error(function(data) {
        console.error("Error: " + data);
      });
  };

  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.getAll();

}]);