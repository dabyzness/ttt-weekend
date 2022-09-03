import Game from "./methods/Game.js";

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

const boardName = [
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

/*------------ Variables (state) ----- */
let game, turn;

/*---------- Cached Element References ------------*/
const gameEl = document.querySelector(".game");
const messageEl = document.getElementById("message");
let boardEls;

/*--------------- Event Listeners --------*/
gameEl.addEventListener("click", handleClick);

/**
 * Handles click event when trying to play a move
 * @param {Event} e
 */
function handleClick(e) {
  // Grabs the indices of square clicked and its parent board
  const boardIndex = e.target.parentNode.className.includes("board")
    ? parseInt(e.target.parentNode.id[2])
    : parseInt(e.target.id[2]);
  const squareIndex = parseInt(e.target.className[2]);

  // Checks if legal clicks, else returns
  if (boardIndex === null || squareIndex === null) {
    console.log("CLICKED OUTSIDE OF AREA");
    return;
  }

  if (game.getWinner()) {
    console.log("GAME IS OVER");
    return;
  }

  if (game.getCurrentBoard() !== null) {
    if (boardIndex !== game.getCurrentBoard()) {
      console.log("CAN'T CHOOSE THIS BOARD");
      return;
    }
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

  // Set next board that you can play:
  doesBoardHaveWinner(squareIndex)
    ? game.setCurrentBoard(null)
    : game.setCurrentBoard(squareIndex);

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
  messageEl.textContent = "Player 1, place an X anywhere on the board!";
  game
    .getGame()
    .map((board, i) => {
      const boardEl = document.createElement("div");
      boardEl.setAttribute("class", "board");
      boardEl.classList.add("playable");
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
}

/**
 * Render content onto the page based on game state
 */
function render() {
  boardEls.forEach((board, i) => {
    if (game.getCurrentBoard() === null) {
      !game.getGame()[i].getWinner() ? board.classList.add("playable") : null;
    } else if (game.getCurrentBoard() === i) {
      board.classList.add("playable");
    } else {
      board.classList.remove("playable");
    }

    // If there is a winner at the current board, only display winner of that board
    switch (game.getGame()[i].getWinner()) {
      case 1:
        board.classList.add("complete");
        board.innerHTML = "<span>X</span>";
        break;
      case -1:
        board.classList.add("complete");
        board.innerHTML = "<span>O</span>";
        break;
      case "T":
        board.classList.add("complete");
        board.innerHTML = "<span>T</span>";
        break;
      default:
        break;
    }

    if (board.children.length > 1) {
      board.childNodes.forEach((square, j) => {
        // Display what is placed in each square
        switch (game.getGame()[i].getBoard()[j].getValue()) {
          case 1:
            square.textContent = "X";
            break;
          case -1:
            square.textContent = "O";
            break;
          default:
            break;
        }
      });
    }
  });

  let player = turn === 1 ? 1 : 2;
  if (!game.getWinner()) {
    if (game.getCurrentBoard() === null) {
      messageEl.textContent = `Player ${player}, make your move anywhere on the board`;
    } else {
      messageEl.textContent = `Player ${player}, make your move on the ${
        boardName[game.getCurrentBoard()]
      } Board`;
    }
  } else {
    renderWinner();
  }
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
  game.getGame()[boardIndex].setWinner();
  game.setWinner();
}

function renderWinner() {
  switch (game.getWinner()) {
    case 1:
      messageEl.textContent = "Player 1 Won!";
      break;
    case -1:
      messageEl.textContent = "Player 2 Won!";
      break;
    case "T":
      messageEl.textContent = "It's a Tie!";
      break;
    default:
      break;
  }

  game
    .getComboValues()
    .reduce((prev, value, i) => {
      Math.abs(value) === 3 ? prev.push(winningCombos[i]) : null;
      return prev;
    }, [])
    .flat()
    .forEach((index) => {
      boardEls[index].classList.add("winning-combo");
    });

  boardEls.forEach((boardEl) => {
    boardEl.classList.remove("playable");
  });
}
