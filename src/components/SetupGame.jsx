/* eslint-disable react/prop-types */

import Button from "./Basic/Button";
import DropDownQuiz from "./Basic/DropDownQuiz";
import "./SetupGame.css";

export default function SetupGame({
  onGameStart,
  isGameStarted,
  onThemeSelected,
  theme,
}) {
  let buttonStartElement = (
    <>
      <Button
        onClick={() => onGameStart(isGameStarted)}
        className={!isGameStarted ? "start" : "end"}
      >
        {!isGameStarted ? "Start Game" : "End Game"}
      </Button>
    </>
  );

  return (
    <>
      <section className="setup-game">
        <div className="select-quiz">
          <DropDownQuiz
            onThemeSelected={onThemeSelected}
            theme={theme}
            isGameStarted={isGameStarted}
          />
          {theme && buttonStartElement}
        </div>
      </section>
    </>
  );
}
