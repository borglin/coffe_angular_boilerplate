angular = require('angular')

app = angular.module('myStarterApp', [])

app.controller('StarterCtrl', ($scope) ->
  $scope.test = 'Test Variable'
)