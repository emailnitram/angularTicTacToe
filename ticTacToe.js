var app = angular.module('ticTacToe',[]);

app.controller('MainController',
function($scope) {
  $scope.currentPlayer = 'X';
  $scope.marks = [[],[],[]];
  $scope.marks[1][1] = 'O';
  $scope.movesLeft = 9;
  $scope.attemptMove = function(row,num){
    if($scope.marks[row][num]) return;
    $scope.marks[row][num] = $scope.currentPlayer;
    $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
    $scope.checkForLoss();
    $scope.movesLeft--;
    if($scope.movesLeft === 8) $scope.secondMove(row,num);
  };
  $scope.checkForLoss = function(){
    console.log('check for loss');
    var row0 = $scope.marks[0];
    var row1 = $scope.marks[1];
    var row2 = $scope.marks[2];
    function checkRow(row){
      var x = 0;
      for(var i = 0; i < row.length; i++){
        if(row[i] === 'X') x++;
      }
      return x > 1;
    }
    function blockWin(rownum,row){
      console.log(rownum)
      for(var i = 0; i < row.length; i++){
      console.log(i)
        if(!row[i]) $scope.attemptMove(rownum,i);
      }
    }
    if(checkRow(row0)){
      blockWin(0,row0)
    } else if(checkRow(row2)){
      blockWin(2,row2)
    }
  };
  $scope.secondMove = function(row,num){
    if(row === 1){
      if(num === 0) $scope.attemptMove(0,2);
      if(num === 2) $scope.attemptMove(0,0);
    } else if(row === 0){
      num < 2 ? $scope.attemptMove(2,2) : $scope.attemptMove(2,0);
    } else {
      num < 2 ? $scope.attemptMove(0,2) : $scope.attemptMove(0,0);
    }
  };
 });
