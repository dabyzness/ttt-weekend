import Board from "./Board.js";

export default class Game {
  constructor() {
    this.game = [];
    this.winner = null;

    for (let i = 0; i < 9; i += 1) {
      this.game.push(new Board());
    }
  }

  getGame() {
    return this.game;
  }
}
