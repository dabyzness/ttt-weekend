import Square from "./Square.js";

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

export default class Board {
  constructor() {
    this.board = [];
    this.winner = null;

    for (let i = 0; i < 9; i += 1) {
      this.board.push(new Square());
    }
  }

  /* ------ Getters ------ */
  getBoard() {
    return this.board;
  }

  getWinner() {
    return this.winner;
  }

  /* ------ Setters ------ */
  setBoard(squareIndex, value) {
    this.board[squareIndex].setValue(value);
  }

  setWinner() {
    this.winner = this.hasWinner();
  }

  /* ------ Methods ------ */
  /**
   * Checks to see if there is a winner
   * @returns 1, -1, 'T', or null
   * 1  ----> Player 1 wins
   * -1 ----> Player 2 wins
   * 'T' ---> Tie
   * null --> Board is ongoing
   */
  hasWinner() {
    // Totals current values of legal combinations within board
    const comboValues = winningCombos.map(
      (combo) =>
        this.board[combo[0]].getValue() +
        this.board[combo[1]].getValue() +
        this.board[combo[2]].getValue()
    );

    console.log(comboValues);

    // If there is a winner (value is either 3 or -3), return a winner
    if (comboValues.some((value) => Math.abs(value) === 3)) {
      return comboValues.find((value) => Math.abs(value) === 3) > 0 ? 1 : -1;
    }

    // If board is full and there is no winner, return a tie
    if (!this.board.some((square) => square.getValue() === null)) {
      return "T";
    }

    // game over conditons have not been satisfied
    return null;
  }
}
