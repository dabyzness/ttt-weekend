import Board from "../methods/Board.js";

/*--------- Constants -----------------*/

/*------------ Variables (state) ----- */

let game, turn;

/*---------- Cached Element References ------------*/
const messageEl = document.getElementById("message");
const boardEl = document.querySelector(".board");
let squareEls;
const resetEl = document.getElementById("reset");

/*--------------- Event Listeners --------*/
boardEl.addEventListener("click", handleClick);
resetEl.addEventListener("click", init);

function handleClick(e) {
  const clickedIndex = parseInt(e.target.className[2]);

  if (!clickedIndex && clickedIndex != 0) {
    return;
  }

  if (game.getBoard()[clickedIndex].getValue()) {
    return;
  }

  if (game.getWinner()) {
    return;
  }

  game.getBoard()[clickedIndex].setValue(turn);
  turn *= -1;

  game.setWinner();

  render();
}

/*------------------- Functions ------------------*/
init();

function init() {
  boardEl.innerHTML = "";
  game = new Board();
  turn = 1;

  renderInit();
}

function renderInit() {
  resetEl.style.display = "none";
  game.getBoard();
  messageEl.innerHTML = "Player 1's Turn";

  game
    .getBoard()
    .map((square, j) => {
      const squareEl = document.createElement("div");
      squareEl.setAttribute("class", `sq${j} square`);
      squareEl.textContent = square.getValue();

      return squareEl;
    })
    .forEach((squareEl) => boardEl.appendChild(squareEl));

  squareEls = document.querySelectorAll(".square");
}

function render() {
  resetEl.style.display = "inline-block";

  switch (game.getWinner()) {
    case 1:
      messageEl.textContent = "Player 1 Wins!";
      break;
    case -1:
      messageEl.textContent = "Player 2 Wins!";
      break;
    case "T":
      messageEl.textContent = "It's a tie!";
      break;
    default:
      let player = turn > 0 ? "1" : "2";
      messageEl.textContent = `Player ${player}'s Turn`;
      break;
  }

  game.getBoard().forEach((square, i) => {
    if (!square.getValue()) {
      return;
    }

    squareEls[i].textContent = square.getValue() > 0 ? "X" : "O";
  });
}
