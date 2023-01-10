/*PSEUDOCODE
Press play button:
-game starts (add event listener and function to listen for the play button 'click')
-board resets
-display shows who's turn it is (on 'click' display html = 'Player 1's Turn')

Click board:
-when grid is clicked it should display X or O (event listener and function to listen for on 'click' cell html = X or O)
-display should indicate turn (Now display HTML = 'Player 2s Turn')
-play button greys out or changes to 'Reset Game' (when play/reset is pressed, cells html = " ")
player_1 array = when player clicks a cell, the cell number is logged in array until winning combination.
player_2 array = when cell clicked, the cell number is logged in array

Winner:
- Array method () to detect winning combination in player_1 or player_2 array (filter() creates new array / or from() / includes() / some())
-3 in a row (create winning combinations in array)
-display the winner ('for' loop to detect a winning combination)
-play button activates
*/

//VARIABLES of all board elements//
// const playerX = code
// const playerO =
// const winningCombinations =

let display = document.querySelector(".display-score");
const board = document.querySelector(".board");
let playButton = document.querySelector("#start-btn");
let cells = document.querySelectorAll(".grid-item");
let isWinner = false;
let playerTurn = 1; //player 1 starts
let player1Clicks = []; //to record which cell player1 clicked
let player2Clicks = []; //to record which cell player2 clicked

//function to start game after start button pressed//
function startGame() {
  display.innerHTML = "Player 1 to start"; //change display
  display.style.backgroundColor = "#0052CC"; //change display color #4d9186 #0CBF77
  playButton.innerHTML = "Reset Game"; //change text to indicate different function
  player1Clicks = [];
  player2Clicks = [];
  cells.forEach(function (cell) {
    cell.innerHTML = ""; //the board clears
    cell.style.backgroundColor = "white";
  });
  playerTurn = 1;
  isWinner = false;
}

//event listener for the play button//
playButton.addEventListener("click", function () {
  startGame();
});

function playerTurnToClick(cell, index) {
  if (isWinner) {
    return;
  }
  //when a cell is clicked
  if (cell.innerHTML !== "") {
    //if cell is not blank, do nothing.
    return;
  }
  if (playerTurn === 1) {
    cell.innerHTML = "X"; //changes to cross
    // console.log(!(cell === '')); //=>true
    cell.style.backgroundColor = "#0052CC"; //and color changes
    player1Clicks.push(index); //push p1 cell log into array
  } else {
    //player 2's turn//
    cell.innerHTML = "O"; //changes to circle
    // console.log(cell === '');//=>false
    cell.style.backgroundColor = "#3FBFBF"; //and color changes #684d6b #F5621D
    player2Clicks.push(index); //push p2 cell log into array
  }

  isWinner = determineWinner(playerTurn);
  console.log(isWinner);

  if (isWinner) {
    display.innerHTML = `Player ${playerTurn} WINS!`;

    return;
  }
  if (player1Clicks.length + player2Clicks.length === 9 && !isWinner) {
    display.innerHTML = "Its a DRAW!";
    return;
  }

  if (playerTurn === 1) {
    playerTurn = 2; //switch to player 2's turn
    display.innerHTML = "Player 2 turn"; //display changes to prompt player 2 to take their turn//
    display.style.backgroundColor = "#3FBFBF"; //player 2 display color change//
  } else {
    playerTurn = 1; //switch to player 1's turn
    display.innerHTML = "Player 1 turn"; //display changes to prompt player 1 to take their turn//
    display.style.backgroundColor = "#0052CC"; //player 1 display color change//
  }
}
//click listener event for the cells on board//
cells.forEach((cell, index) => {
  //runs forEach function for each cell in grid//
  cell.addEventListener("click", () => playerTurnToClick(cell, index));
});

function determineWinner(playerTurn) {
  const winningCombinations = [
    [0, 1, 2], //row 1
    [3, 4, 5], //row 2
    [6, 7, 8], //row 3
    [0, 3, 6], //column 1
    [1, 4, 7], //column 2
    [2, 5, 8], //column 3
    [0, 4, 8], //diagonal 1
    [2, 4, 6], //diagonal 2
  ];
  let playerClicks = playerTurn === 1 ? player1Clicks : player2Clicks;
  // which player has the winning numbers //
  if (playerClicks.length >= 3) {
    const hasWon = winningCombinations.some((combination) => {
      return combination.every((element) => {
        return playerClicks.includes(element);
      });
    });
    return hasWon ? playerTurn : false;
  }
  return false;
}

// function results(clicks) {
//   const winningCombinations = [
//     [0, 1, 2], //row 1
//     [3, 4, 5], //row 2
//     [6, 7, 8], //row 3
//     [0, 3, 6], //column 1
//     [1, 4, 7], //column 2
//     [2, 5, 8], //column 3
//     [0, 4, 8], //diagonal 1
//     [2, 4, 6], //diagonal 2
//   ];
//   //check if any of the winning combinations are present in the clicks array
//   return winningCombinations.some((combination) =>
//     combination.every((number) => clicks.includes(number))
//   );
// }

// function checkForWinner() {
//   if (results(player1Clicks)) {
//     display.innerHTML = "Player 1 wins!";
//     isWinner = true;
//   } else if (results(player2Clicks)) {
//     display.innerHTML = "Player 2 wins!";
//     isWinner = true;
// }

//function to reset board//
// function resetBoard() {
//   display.innerHTML = "Player 1 to start"; //change display
//   display.style.backgroundColor = "#4d9186"; //change display color
//   playButton.innerHTML = "Reset Game"; //change text to indicate different function
//   cells.forEach(function (cell) {
//     cell.innerHTML = ""; //the board clears
//     cell.style.backgroundColor = "white";
//   });
//   playerTurn = 1;
//   player1Clicks = [];
//   player2Clicks = [];
// }
// const testArray = [0, 1, 2];

// function isWinningCombination(combination) {
//

// //function to reset board//
// function resetBoard(){
//     cells.forEach(function(cell) {
//         cell.innerHTML = ''; //the board clears
//         cell.style.backgroundColor = 'white';
//     });
// };

// function playerOneLog() {

//     cells.forEach((cell, index) => {
//         cell.addEventListener('click', event => {
//         player1Clicks.push(index);
//         console.log(player1Clicks);
//             // console.log(`you clicked ${index}`);
//         })
//     })
// }

// function playerTwoLog() {

//     cells.forEach((cell, index) => {
//         cell.addEventListener('click', event => {
//         player2Clicks.push(index);
//         console.log(player2Clicks);
//             // console.log(`you clicked ${index}`);
//         })
//     })
// }

// let winner = determineWinner(playerTurn);
// if (winner) {
//   display.innerHTML = `Player ${winner} wins!`;
//   display.style.backgroundColor = winner === 1 ? "#4d9186" : "#684d6b";
//   cells.forEach((cell) => {
//     cell.removeEventListener("click", event);
//   });
// }
