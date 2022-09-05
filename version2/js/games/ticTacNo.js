import Board from "../methods/Board.js";

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

let game, turn;
let count = 0;

/*---------- Cached Element References ------------*/
const messageEl = document.getElementById("message");
const boardEl = document.querySelector(".board");
const squareEls = document.querySelectorAll(".square");
const resetEl = document.getElementById("reset");
let notThisOne;
const sound = document.getElementById("sound");

/*--------------- Event Listeners --------*/
boardEl.addEventListener("click", handleClick);
resetEl.addEventListener("click", init);

function handleClick(e) {
  const clickedIndex = parseInt(e.target.className[2]);
  console.log(clickedIndex);

  if (turn === -1) {
    return;
  }

  if (!clickedIndex && clickedIndex != 0) {
    return;
  }

  if (game.getBoard()[clickedIndex].getValue()) {
    return;
  }

  if (game.getWinner()) {
    return;
  }

  if (squareEls[clickedIndex].classList.contains("playable")) {
    nope();
    return;
  } else if (notThisOne) {
    clearEvilSquare();
  }

  if (checkIfPossibleWin(clickedIndex)) {
    squareEls[clickedIndex].classList.add("playable");
    notThisOne = document.querySelector(".playable");
    return;
  }

  game.getBoard()[clickedIndex].setValue(turn);
  turn *= -1;

  game.setWinner();

  render();

  opponentMove();
}

/*------------------- Functions ------------------*/
init();

function init() {
  game = new Board();
  turn = 1;

  renderInit();
}

function renderInit() {
  resetEl.style.display = "none";
  game.getBoard();
  messageEl.innerHTML = "Player 1's Turn";
  if (notThisOne) {
    clearEvilSquare();
  }

  squareEls.forEach((squareEl) => {
    squareEl.innerHTML = "";
  });
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
      if (turn === 1) {
        messageEl.textContent = "Player 1's Turn";
      } else {
        messageEl.textContent = "Player 2 is Thinking";
      }
  }

  game.getBoard().forEach((square, i) => {
    if (!square.getValue()) {
      return;
    }

    squareEls[i].textContent = square.getValue() > 0 ? "X" : "O";
  });
}

function opponentMove() {
  setTimeout(() => {
    const newBoard = game
      .getBoard()
      .filter((square) => square.getValue() === null);

    const randomInt = Math.floor(Math.random() * newBoard.length);

    newBoard[randomInt].setValue(turn);

    turn *= -1;
    game.setWinner();
    render();
  }, 5000);
}

function checkIfPossibleWin(squareIndex) {
  const comboValues = winningCombos.map((combo) => {
    let value = 0;
    combo.forEach((index) => {
      if (index === squareIndex) {
        value += 1;
      } else {
        value += game.getBoard()[index].getValue();
      }
    });

    return value;
  });

  return comboValues.includes(3);
}

function clearEvilSquare() {
  notThisOne.style.background = "";
  notThisOne.style.transform = "";
  notThisOne.style.color = "";
  notThisOne.textContent = "";

  squareEls.forEach((square) => {
    if (square.classList.contains("playable")) {
      square.style.fontSize = "7rem";
    }
    square.classList.remove("playable");
  });

  count = 0;
  notThisOne = null;
}

function nope() {
  const color1 = Math.floor(Math.random() * 255);
  const color2 = Math.floor(Math.random() * 255);
  const color3 = Math.floor(Math.random() * 255);

  switch (count) {
    case 0:
      notThisOne.style.background = `rgb(${color1}, ${color2}, ${color3})`;
      break;
    case 1:
      notThisOne.style.background = `rgb(${color1}, ${color2}, ${color3})`;
      break;
    case 2:
      notThisOne.style.background = `rgb(${color1}, ${color2}, ${color3})`;
      break;
    case 3:
      notThisOne.style.background = `rgb(${color1}, ${color2}, ${color3})`;
      notThisOne.textContent = "NO";
      notThisOne.style.color = "white";
      break;
    case 4:
      notThisOne.style.background = `rgb(${color1}, ${color2}, ${color3})`;
      notThisOne.textContent = "NU-UH";
      notThisOne.style.fontSize = "3.5rem";
      break;
    case 5:
      notThisOne.style.background = `rgb(${color1}, ${color2}, ${color3})`;
      notThisOne.textContent = "NOT A CHANCE";
      notThisOne.style.fontSize = "2.5rem";
      break;
    case 6:
      notThisOne.style.background = `rgb(${color1}, ${color2}, ${color3})`;
      notThisOne.textContent = "NOT GONNA HAPPEN";
      notThisOne.style.fontSize = "2rem";
      break;
    case 7:
      notThisOne.style.background = `rgb(${color1}, ${color2}, ${color3})`;
      notThisOne.textContent = "...";
      break;
    case 8:
      notThisOne.style.background = `rgb(${color1}, ${color2}, ${color3})`;
      notThisOne.textContent = "STOP";
      break;
    case 9:
      notThisOne.style.background = `rgb(${color1}, ${color2}, ${color3})`;
      notThisOne.textContent = "SERIOUSLY, THAT HURTS!";
      break;
    case 10:
      notThisOne.style.background = `rgb(${color1}, ${color2}, ${color3})`;
      notThisOne.textContent = "...";
      break;
    case 11:
      notThisOne.textContent = "FINE, I'M LEAVING!";
      break;
    default:
      sound.currentTime = 0;
      sound.play();
      notThisOne.style.background = `rgb(${color1}, ${color2}, ${color3})`;
      const interval1 =
        Math.random() > 0.5
          ? Math.floor(Math.random() * 300)
          : Math.floor(Math.random() * -300);
      const interval2 =
        Math.random() > 0.5
          ? Math.floor(Math.random() * 300)
          : Math.floor(Math.random() * -300);
      notThisOne.style.transform = `translate(${interval1}%, ${interval2}%)`;
      notThisOne.textContent = "YOU'RE TOO SLOW";
      break;
  }

  count += 1;
}
