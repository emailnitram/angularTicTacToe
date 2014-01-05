var app = angular.module('ticTacToe',[]);

app.controller('MainController',
function($scope) {
  $scope.currentPlayer = 'X';
  $scope.marks = [[],[],[]];
  $scope.marks[1][1] = 'O';
  $scope.movesLeft = 8;
  $scope.attemptMove = function(row,num){
    if($scope.marks[row][num]) return;
    $scope.marks[row][num] = $scope.currentPlayer;
    $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
    $scope.preventLoss();
    $scope.movesLeft--;
    if($scope.movesLeft === 7) $scope.secondMove(row,num);
  };

  // Check after each turn to see if a loss could be prevented
  $scope.preventLoss = function(){
    var row0 = $scope.marks[0];
    var row1 = $scope.marks[1];
    var row2 = $scope.marks[2];
    var col0 = [row0[0],row1[0],row2[0]];
    var col1 = [row0[1],row1[1],row2[1]];
    var col2 = [row0[2],row1[2],row2[2]];
    function checkRow(row){
      var x = 0;
      for(var i = 0; i < row.length; i++){
        if(row[i] === 'X') x++;
      }
      return x > 1;
    };
    function blockRow(rownum,row){
      for(var i = 0; i < 3; i++){
        if(row[i] !== 'X') $scope.attemptMove(rownum,i);
      }
    };
    function checkCol(col){
      var x = 0;
      for(var i = 0; i < col.length; i++){
        if(col[i] === 'X') x++;
      }
      return x > 1;
    };
    function blockCol(colnum,column){
      console.log('block')
      for(var i = 0; i < 3; i++){
        if(column[i] !== 'X') $scope.attemptMove(i,colnum);
      }
    }
    if(checkRow(row0)){
      blockRow(0,row0);
    } else if(checkRow(row2)){
      blockRow(2,row2);
    }
    if(checkCol(col0)){
      blockCol(0,col0);
    } else if (checkCol(col2)){
      blockCol(2,col2);
    }
  };

  // Only expected to execute this function after the second move has been played
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
