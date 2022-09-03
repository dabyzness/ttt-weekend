import Board from "./Board.js";

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

export default class Game {
  constructor() {
    this.game = [];
    this.winner = null;
    this.currentBoard = null;

    for (let i = 0; i < 9; i += 1) {
      this.game.push(new Board());
    }
  }

  /* ------ Getters ------ */

  getGame() {
    return this.game;
  }

  getWinner() {
    return this.winner;
  }

  getCurrentBoard() {
    return this.currentBoard;
  }

  /* ------ Setters ------ */
  setGame(boardIndex, squareIndex, value) {
    this.board[boardIndex].setBoard(squareIndex, value);
  }

  setWinner() {
    this.winner = hasWinner();
  }

  setCurrentBoard(boardIndex) {
    this.currentBoard = boardIndex;
  }

  /* ------ Methods ------ */
  /**
   * Checks to see if there is a winner
   * @returns 1, -1, 'T', or null
   * 1  ----> Player 1 wins
   * -1 ----> Player 2 wins
   * 'T' ---> Tie
   * null --> Game is ongoing
   */
  hasWinner() {
    const comboValues = winningCombos.map((combo) => {
      let value = 0;

      combo.forEach((index) => {
        value += game[index].getWinner() === "T" ? 0 : game[index].getWinner();
      });

      return value;
    });

    if (comboValues.includes(Math.abs(3))) {
      return comboValues.find((value) => value === Math.abs(3)) > 0 ? 1 : -1;
    }

    if (!this.game.some((board) => board.getWinner() === null)) {
      return "T";
    }

    return null;
  }
}
