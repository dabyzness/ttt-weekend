import Game from "./methods/Game.js";

/*--------- Constants -----------------*/

/*------------ Variables (state) ----- */
let game;

/*---------- Cached Element References ------------*/
const gameEl = document.querySelector(".game");

/*--------------- Event Listeners --------*/

/*------------------- Functions ------------------*/

init();

// initialize state of the game
function init() {
  // clear out previous HTML element in the game section
  gameEl.innerHTML = "";
  game = new Game();
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
}
