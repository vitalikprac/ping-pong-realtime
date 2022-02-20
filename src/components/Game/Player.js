import {
  HEIGHT,
  PLAYER_HEIGHT,
  PLAYER_LEFT_SIDE,
  PLAYER_RIGHT_SIDE,
  PLAYER_START_X_COORDINATES,
  PLAYER_WIDTH,
  WIDTH,
} from './constants';

export class Player {
  constructor({ side, p5, name }) {
    this.name = name;
    this.side = side;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    if (side === PLAYER_LEFT_SIDE) {
      this.x = PLAYER_START_X_COORDINATES;
    } else if (side === PLAYER_RIGHT_SIDE) {
      this.x = WIDTH - PLAYER_START_X_COORDINATES - this.width;
    }

    this.y = HEIGHT / 2 - this.height / 2;
    this.p5 = p5;
  }

  draw() {
    this.p5.rect(this.x, this.y, this.width, this.height);
  }

  changePosition({ mouseY, isMouseDragged }) {
    if (isMouseDragged) {
      if (mouseY < this.height / 2) {
        this.y = 0;
      } else if (mouseY > HEIGHT - this.height / 2) {
        this.y = HEIGHT - this.height;
      } else {
        this.y = mouseY - this.height / 2;
      }
    }
  }
}
