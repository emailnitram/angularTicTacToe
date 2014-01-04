var app = angular.module('ticTacToe',[]);

app.controller('MainController',
function($scope) {
  $scope.currentPlayer = 'X';
  $scope.marks = [];
  $scope.attemptMove = function(num){
    if($scope.marks[num]) return;
    $scope.marks[num] = $scope.currentPlayer;
    $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
  };
 });

app.filter('capitalize', function(){
  return function(input){
    if(input){
      return input[0].toUpperCase() + input.slice(1);
    }
  }
});

app.directive('boardSquare', function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      num: '@'
    },
    template: '<div id="{{num}}">{{mark.one}}</div>'
  }
})
