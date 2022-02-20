import { useEffect, useRef, useState } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

import { sketch } from './sketch';
import * as S from './Game.styled';

const Game = () => {
  const [game, setGame] = useState(null);

  const handleStart = () => {
    game?.link?.startGame?.();
  };

  return (
    <S.Wrapper>
      <div>Hello :0</div>
      <ReactP5Wrapper sketch={sketch} setGame={setGame} />
      {game?.gameOver && (
        <>
          <div>Game over :). Winner is: {game?.winner?.name} </div>
          <button type="button" onClick={handleStart}>
            Start again
          </button>
        </>
      )}
    </S.Wrapper>
  );
};

export default Game;
