/* eslint-disable react/prop-types */
import "./Player.css";
import Button from "./Basic/Button";

export default function Player({
  playerData,
  onGameStart,
  activePlayer,
  onPointsUpdate,
}) {
  let editingName = playerData.name;
  let editingPower = playerData.power;
  let editingDefense = playerData.defense;

  function handleClick(action) {
    if (action === "+" && editingDefense > 1) {
      editingPower += 1;
      editingDefense -= 1;
    } else if (action === "-" && editingPower > 1) {
      editingPower -= 1;
      editingDefense += 1;
    }

    onPointsUpdate(playerData.id, editingPower, editingDefense);
  }

  let attackDefenseElement = (
    <>
      <span>
        <b>{"Hit points:"}</b> {playerData.points}
      </span>
      <span>
        <b>Dice:</b> {playerData.dice}
      </span>
      <span>
        <b>Multiplier:</b> {playerData.multiplier > 1 && "x"}
        {playerData.multiplier}
      </span>
    </>
  );

  return (
    <section
      className={
        playerData.id === activePlayer && onGameStart
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
            <b>Health:</b> {playerData.health}
          </span>
        </div>
        {onGameStart && (
          <div className="player-column">{attackDefenseElement}</div>
        )}
        {!onGameStart && (
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
