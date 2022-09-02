/*--------- Constants -----------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*------------ Variables (state) ----- */
let board, turn, winner;

/*---------- Cached Element References ------------*/
const sqaureEls = document.querySelectorAll("section > div");
const messageEl = document.getElementById("message");
console.log(sqaureEls);

/*--------------- Event Listeners --------*/

/*------------------- Functions ------------------*/
init();

function init() {
  board = new Array(9).fill(null);
  turn = 1;
  winner = null;

  render();
}

function render() {
  board.forEach(function (square, idx) {
    if (square === 1) {
      sqaureEls[idx].textContent = "X";
    } else if (square === -1) {
      sqaureEls[idx].textContent = "O";
    } else {
      sqaureEls[idx].textContent = "";
    }
  });

  switch (winner) {
    case "T":
      messageEl.textContent = `It's a tie!`;
      break;
    case 1:
      messageEl.textContent = `Player 1 wins!`;
      break;
    case -1:
      messageEl.textContent = `Player 2 wins!`;
      break;
    default:
      const playerTurn = turn === 1 ? "1" : "2";
      messageEl.textContent = `It's Player ${playerTurn}'s turn!`;
      break;
  }
}
