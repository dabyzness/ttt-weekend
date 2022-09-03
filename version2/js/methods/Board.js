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

class Board {
  constructor() {
    this.board = new Array(9).fill(new Square());
    this.winner = null;
  }

  /* ------ Getters ------ */
  getBoard() {
    return this.board;
  }

  getWinner() {
    this.winner;
  }

  /* ------ Setters ------ */
  setBoard(index, value) {
    this.board[index].setValue(value);
  }

  setWinner() {}

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
    // Totals current values of legal combinations within board
    const comboValues = winningCombos.map(
      (combo) =>
        this.board[combo[0]].getValue() +
        this.board[combo[1]].getValue() +
        this.board[combo[2]].getValue()
    );

    // If there is a winner (value is either 3 or -3), return a winner
    if (comboValues.some((value) => Math.abs(value) === 3)) {
      return comboValues.find((value) => Math.abs(value) === 3) > 0 ? 1 : -1;
    }

    // If board is full and there is no winner, return a tie
    if (!this.board.includes(null)) {
      return "T";
    }

    // game over conditons have not been satisfied
    return null;
  }
}
