/* eslint-disable react/prop-types */
import "./Player.css";
import Button from "./Basic/Button";

import { PlayerContext } from "../context/player-context";
import { useContext } from "react";

export default function Player({ playerId }) {
  const { player, gameStarted, status, updatePlayer } =
    useContext(PlayerContext);

  let editingName = player[playerId].name;
  let editingPower = player[playerId].power;
  let editingDefense = player[playerId].defense;

  function handleClick(action) {
    if (action === "+" && editingDefense > 1) {
      editingPower += 1;
      editingDefense -= 1;
    } else if (action === "-" && editingPower > 1) {
      editingPower -= 1;
      editingDefense += 1;
    }

    updatePlayer(player[playerId].id, editingPower, editingDefense);
  }

  let attackDefenseElement = (
    <>
      <span>
        <b>{"Hit points:"}</b> {player[playerId].points}
      </span>
      <span>
        <b>Dice:</b> {player[playerId].dice}
      </span>
      <span>
        <b>Multiplier:</b> {player[playerId].multiplier > 1 && "x"}
        {player[playerId].multiplier}
      </span>
    </>
  );

  return (
    <section
      className={
        player[playerId].id === status.activePlayer && gameStarted
          ? "player active"
          : "player"
      }
    >
      <h2>{editingName}</h2>
      <div className="player_data">
        <div className="player-column">
          <span>
            <b>Power:</b> {editingPower}
          </span>
          <span>
            <b>Defense:</b> {editingDefense}
          </span>
          <span>
            <b>Health:</b> {player[playerId].health}
          </span>
        </div>
        {gameStarted && (
          <div className="player-column">{attackDefenseElement}</div>
        )}
        {!gameStarted && (
          <div>
            <span>
              <Button
                className="edit-points"
                onClick={() => handleClick("+")}
              >
                +
              </Button>
            </span>
            <span>
              <Button
                className="edit-points"
                onClick={() => handleClick("-")}
              >
                -
              </Button>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
