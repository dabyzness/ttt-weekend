/*--------- Constants -----------------*/

/*------------ Variables (state) ----- */
let board, turn, winner;

/*---------- Cached Element References ------------*/
const sqaureEls = document.querySelectorAll("section > div");
const messageEl = document.getElementById("message");

/*--------------- Event Listeners --------*/

/*------------------- Functions ------------------*/
init();

function init() {
  board = new Array(9).fill(null);
  turn = 1;
  winner = null;

  render();
}

function render() {}
