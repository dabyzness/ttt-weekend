import Game from "./methods/Game.js";

/*--------- Constants -----------------*/

/*------------ Variables (state) ----- */
let game, turn;

/*---------- Cached Element References ------------*/
const gameEl = document.querySelector(".game");
let boardEls;

/*--------------- Event Listeners --------*/
gameEl.addEventListener("click", handleClick);

/**
 * Handles click event when trying to play a move
 * @param {Event} e
 */
function handleClick(e) {
  // Grabs the indices of square clicked and its parent board
  const boardIndex = parseInt(e.target.parentNode.id[2]) || null;
  const squareIndex = parseInt(e.target.className[2]) || null;

  // Checks if legal clicks, else returns
  if (boardIndex === null || squareIndex === null) {
    console.log("CLICKED OUTSIDE OF AREA");
    return;
  }

  if (game.getWinner()) {
    console.log("GAME IS OVER");
    return;
  }

  if (doesBoardHaveWinner(boardIndex)) {
    console.log("BOARD HAS WINNER");
    return;
  }

  if (isSquareTaken(boardIndex, squareIndex)) {
    console.log("SQUARE TAKEN");
    return;
  }

  // Updates game state
  game.setGame(boardIndex, squareIndex, turn);
  setWinners(boardIndex);
  turn *= -1;

  // Renders any changes made in state variable
  render();
}

/*------------------- Functions ------------------*/

init();

// initialize state of the game
function init() {
  // clear out previous HTML element in the game section
  gameEl.innerHTML = "";
  game = new Game();
  turn = 1;
  renderInit();
}

/**
 * Initial render of the game board
 */
function renderInit() {
  game
    .getGame()
    .map((board, i) => {
      const boardEl = document.createElement("div");
      boardEl.setAttribute("class", "board");
      boardEl.setAttribute("id", `bd${i}`);

      board
        .getBoard()
        .map((square, j) => {
          const squareEl = document.createElement("div");
          squareEl.setAttribute("class", `sq${j}`);
          squareEl.textContent = square.getValue();

          return squareEl;
        })
        .forEach((squareEl) => boardEl.appendChild(squareEl));

      return boardEl;
    })
    .forEach((boardEl) => {
      gameEl.appendChild(boardEl);
    });

  boardEls = document.querySelectorAll(".board");
  console.log(boardEls);
}

function render() {
  boardEls.forEach((board) => {
    console.log(board.childNodes);
  });
}

/**
 * Checks if the board has a winner
 * @param {number} boardIndex
 * @returns boolean
 */
function doesBoardHaveWinner(boardIndex) {
  return game.getGame()[boardIndex].getWinner() ? true : false;
}

/**
 * checks if the square clicked has a value
 * @param {number} boardIndex
 * @param {number} squareIndex
 * @returns boolean
 */
function isSquareTaken(boardIndex, squareIndex) {
  return game.getGame()[boardIndex].getBoard()[squareIndex].getValue()
    ? true
    : false;
}

/**
 * Sets the winner property on both board and game
 * @param {number} boardIndex
 */
function setWinners(boardIndex) {
  game.setWinner();
  game.getGame()[boardIndex].setWinner();
  console.log(game.getWinner());
}
