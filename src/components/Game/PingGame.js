import { WIDTH } from './constants';

export class PingGame {
  constructor({ leftPlayer, rightPlayer, circle }) {
    this.leftPlayer = leftPlayer;
    this.rightPlayer = rightPlayer;
    this.circle = circle;
    this.startGame();
  }

  checkBoundaries() {
    if (
      this.circle.x - this.circle.radius <
        this.leftPlayer.x - this.leftPlayer.width ||
      this.circle.x + this.circle.radius >
        this.rightPlayer.x + this.rightPlayer.width * 2
    ) {
      this.winner =
        this.circle.x > WIDTH / 2 ? this.leftPlayer : this.rightPlayer;
      this.circle.reset();
      this.gameOver = true;
      this.props?.setGame?.({ ...this, link: this });
    }
  }

  updateProps(props) {
    this.props = props;
  }

  startGame() {
    this.gameOver = false;
    this.winner = null;
    this.circle.initRandom();
    this.props?.setGame?.({ ...this, link: this });
  }
}
