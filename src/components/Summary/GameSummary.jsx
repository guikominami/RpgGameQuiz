/* eslint-disable react/prop-types */
import "./GameSummary.css";

export default function GameSummary({ playerAttack, playerDefend }) {
  const winner =
    playerAttack.health > 0 ? playerAttack.name : playerDefend.name;

  return (
    <>
      <h2>End of Game</h2>
      <div className="result-summary">
        <p>Winner: {winner}</p>
      </div>
    </>
  );
}
