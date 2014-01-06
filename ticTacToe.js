var app = angular.module('ticTacToe',[]);

app.controller('MainController', function($scope) {
  $scope.currentPlayer = 'X';
  $scope.winner = '';
  $scope.marks = [[],[],[]];
  $scope.marks[1][1] = 'O';
  $scope.movesLeft = 8;

  $scope.attemptMove = function(row,num){
    if($scope.winner) return $scope.gameOver();
    if($scope.marks[row][num]) return;
    $scope.marks[row][num] = $scope.currentPlayer;
    $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
    $scope.preventLoss();
    $scope.movesLeft--;
    if($scope.movesLeft === 7) $scope.secondMove(row,num);
    $scope.checkForWinner();
    if($scope.currentPlayer === 'O') $scope.attemptWin();
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
      for(var i = 0; i < 3; i++){
        if(column[i] !== 'X') $scope.attemptMove(i,colnum);
      }
    };

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

  // Tell player Game is over;
  $scope.gameOver = function(){
    alert('Game Over');
    location.reload();
  };

  // Attempt to make a move that will win the game
  $scope.attemptWin = function(){
    var corners = [$scope.marks[0][0],$scope.marks[0][2],$scope.marks[2][0],$scope.marks[2][2]];
    var locations = [[0,0],[0,2],[2,0],[2,2]];
    var middles = [$scope.marks[0][1],$scope.marks[1][0],$scope.marks[1][2],$scope.marks[2][1]];
    var middleLocs = [[0,1],[1,2],[1,2],[2,1]];
    for(var i = 0; i < corners.length; i++){
      if(corners[i] === undefined){
        $scope.attemptMove(locations[i][0],locations[i][1])
        return;
      }
    }
    for(var i = 0; i < middles.length; i++){
      if(middles[i] === undefined){
        $scope.attemptMove(middleLocs[i][0],middleLocs[i][1])
        return;
      }
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

  // Check the board for possible win combinations
  $scope.checkForWinner = function(){
    var row0 = $scope.marks[0];
    var row1 = $scope.marks[1];
    var row2 = $scope.marks[2];
    var col0 = [row0[0],row1[0],row2[0]];
    var col1 = [row0[1],row1[1],row2[1]];
    var col2 = [row0[2],row1[2],row2[2]];
    var rightDiag = [row0[0],row1[1],row2[2]];
    var leftDiag = [row0[2],row1[1],row2[0]];
    var o = 0;
    row0.forEach(function(elem){
      if(elem === 'O') o++;
      if(o === 3) $scope.winner = 'O';
    });
    o = 0;
    row1.forEach(function(elem){
      if(elem === 'O') o++;
      if(o === 3) $scope.winner = 'O';
    });
    o = 0;
    row2.forEach(function(elem){
      if(elem === 'O') o++;
      if(o === 3) $scope.winner = 'O';
    });
    o = 0;
    col0.forEach(function(elem){
      if(elem === 'O') o++;
      if(o === 3) $scope.winner = 'O';
    });
    o = 0;
    col1.forEach(function(elem){
      if(elem === 'O') o++;
      if(o === 3) $scope.winner = 'O';
    });
    o = 0;
    col2.forEach(function(elem){
      if(elem === 'O') o++;
      if(o === 3) $scope.winner = 'O';
    });
    o = 0;
    rightDiag.forEach(function(elem){
      if(elem === 'O') o++;
      if(o === 3) $scope.winner = 'O';
    });
    o = 0;
    leftDiag.forEach(function(elem){
      if(elem === 'O') o++;
      if(o === 3) $scope.winner = 'O';
    });
  };
 });
