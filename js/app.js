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
document.querySelector(".board").addEventListener("click", handleClick);
document.getElementById("reset").addEventListener("click", init);

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

function handleClick(e) {
  const clickedIndex = parseInt(e.target.id[2]);

  if (clickedIndex === NaN) {
    return;
  }

  if (board[clickedIndex]) {
    return;
  }

  if (winner) {
    return;
  }

  board[clickedIndex] = turn;
  turn *= -1;

  winner = getWinner();

  render();
}

function getWinner() {
  const comboValues = winningCombos.map(
    (combo) => board[combo[0]] + board[combo[1]] + board[combo[2]]
  );

  let winningCombo = null;

  comboValues.forEach((value) => {
    if (value && value % 3 === 0) {
      winningCombo = value > 0 ? 1 : -1;
    }
  });

  if (winningCombo) {
    return winningCombo;
  }

  if (!board.some((square) => square === null)) {
    return "T";
  }

  return null;
}
