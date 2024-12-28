/* eslint-disable react/prop-types */

import Button from "./Basic/Button";
import DropDownQuiz from "./Basic/DropDownQuiz";
import "./SetupGame.css";

import { PlayerContext } from "../context/player-context";
import { useContext } from "react";

export default function SetupGame() {
  const { theme, gameStarted, startGame } = useContext(PlayerContext);

  let buttonStartElement = (
    <>
      <Button
        onClick={startGame}
        className={!gameStarted ? "start" : "end"}
      >
        {!gameStarted ? "Start Game" : "End Game"}
      </Button>
    </>
  );

  return (
    <>
      <section className="setup-game">
        <div className="select-quiz">
          <DropDownQuiz />
          {theme && buttonStartElement}
        </div>
      </section>
    </>
  );
}
