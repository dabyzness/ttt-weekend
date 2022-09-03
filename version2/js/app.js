import Board from "./methods/Board.js";

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
  game = new Board();
  renderInit();
}

/**
 * Initial render of the game board
 */
function renderInit() {
  game
    .getBoard()
    .map((square, i) => {
      const el = document.createElement("div");
      el.setAttribute("class", `sq${i}`);
      el.textContent = square.getValue();

      return el;
    })
    .forEach((el) => {
      gameEl.appendChild(el);
    });
}
