import { Circle } from './Circle';
import {
  HEIGHT,
  PLAYER_LEFT_SIDE,
  PLAYER_RIGHT_SIDE,
  WIDTH,
} from './constants';
import { PingGame } from './PingGame';
import { Player } from './Player';

/**
 *
 * @param {P5Instance} p5
 */
export const sketch = (p5) => {
  const CLEAR_BACKGROUND = 'white';

  let p5props;
  let isMouseDragged = false;
  let mouseButton = -1;

  const circle = new Circle({ x: WIDTH / 2, y: HEIGHT / 2, radius: 50, p5 });

  const leftPlayer = new Player({
    name: 'Player1',
    side: PLAYER_LEFT_SIDE,
    p5,
  });

  const rightPlayer = new Player({
    name: 'Player2',
    side: PLAYER_RIGHT_SIDE,
    p5,
  });

  const game = new PingGame({
    leftPlayer,
    rightPlayer,
    circle,
  });

  // eslint-disable-next-line no-param-reassign
  p5.setup = () => {
    const canvas = p5.createCanvas(WIDTH, HEIGHT, p5.P2D);
    canvas.elt.addEventListener('contextmenu', (e) => e.preventDefault());
    p5.background(CLEAR_BACKGROUND);
  };

  // eslint-disable-next-line no-param-reassign
  p5.mousePressed = (event) => {
    mouseButton = event.button;
    isMouseDragged = true;
    document.body.style.cursor = 'grab';
    event.preventDefault();
  };

  // eslint-disable-next-line no-param-reassign
  p5.mouseReleased = () => {
    isMouseDragged = false;
    document.body.style.cursor = '';
  };

  // eslint-disable-next-line no-param-reassign
  p5.draw = () => {
    p5.background(CLEAR_BACKGROUND);
    circle.draw();
    leftPlayer.draw();
    rightPlayer.draw();

    const positionParams = {
      mouseX: p5.mouseX,
      mouseY: p5.mouseY,
      isMouseDragged,
    };

    if (mouseButton === 0) {
      leftPlayer.changePosition(positionParams);
    } else if (mouseButton === 2) {
      rightPlayer.changePosition(positionParams);
    }
    circle.intersect(rightPlayer);
    circle.intersect(leftPlayer);
    game.checkBoundaries();
    game.updateProps(p5props);
  };

  // eslint-disable-next-line no-param-reassign
  p5.updateWithProps = (props) => {
    if (props.setGame) {
      // eslint-disable-next-line no-param-reassign
      props.setGame(game);
    }
    p5props = props;
  };
};
