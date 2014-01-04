var app = angular.module('ticTacToe',[]);

app.controller('MainController',
function($scope) {
  $scope.currentPlayer = 'X';
  $scope.isCapitalized = function(str) { return str[0] == str[0].toUpperCase(); }
// Set up a watch 
 });

app.filter('capitalize', function(){
  return function(input){
    if(input){
      return input[0].toUpperCase() + input.slice(1);
    }
  }
});

app.directive('myDirective', function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      myUrl: '=someAttr',
      myLinkText: '@'
    },
    template: '<div><label>My URL Field:</label><input type="text" ng-model="myUrl"><a href="{{myUrl}}">{{myLinkText}}</a></div>'
  }
})
