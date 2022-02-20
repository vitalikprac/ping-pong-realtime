import { HEIGHT, PLAYER_LEFT_SIDE, WIDTH } from './constants';

export class Circle {
  constructor({ x, y, radius, p5 }) {
    this.p5 = p5;
    this.x = x;
    this.y = y;

    this.initRandom();
    this.radius = radius;
  }

  initRandom() {
    const isRight = Math.random() > 0.5 ? 1 : -1;
    const isDown = Math.random() > 0.5 ? 1 : -1;

    this.xVelocity = 5 * isRight;
    this.yVelocity = (2 + Math.random() * 10) * isDown;
  }

  move() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  checkBoundary() {
    if (this.x + this.radius / 2 > WIDTH || this.x - this.radius / 2 < 0) {
      this.xVelocity *= -1;
    }

    if (this.y + this.radius / 2 > HEIGHT || this.y - this.radius / 2 < 0) {
      this.yVelocity *= -1;
    }
  }

  draw() {
    this.p5.circle(this.x, this.y, this.radius);
    this.checkBoundary();
    this.move();
  }

  intersect(player) {
    const checkRightSide = this.x + this.radius / 2 > player.x;
    const checkLeftSide = this.x - this.radius / 2 < player.x + player.width;

    const checkSide =
      player.side === PLAYER_LEFT_SIDE ? checkLeftSide : checkRightSide;

    if (
      checkSide &&
      this.y - this.radius / 2 < player.y + player.height &&
      this.y + this.radius / 2 > player.y
    ) {
      this.xVelocity *= -1;
    }
  }

  reset() {
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
  }
}
