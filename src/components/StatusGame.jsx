/* eslint-disable react/prop-types */
import { useContext } from "react";
import { PlayerContext } from "../context/player-context";
import Question from "./Question";
import "./StatusGame.css";

export default function StatusGame() {
  const { player, status, gameStarted } = useContext(PlayerContext);

  const playerNameAttacking = player[status.attacking].name;
  const playerNameDefending = player[status.defending].name;

  return (
    <>
      {gameStarted && (
        <section className="status-game">
          <div className="status-game-column">
            <h3>
              {status.isAttacking
                ? playerNameAttacking
                : playerNameDefending}{" "}
              ANSWER FOR {status.isAttacking ? "ATTACK" : "DEFENSE"}{" "}
            </h3>
            <Question />
          </div>
        </section>
      )}
    </>
  );
}
