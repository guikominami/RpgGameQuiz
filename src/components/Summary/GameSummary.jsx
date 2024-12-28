import "./GameSummary.css";

import { useContext } from "react";
import { PlayerContext } from "../../context/player-context";

export default function GameSummary() {
  const { player, status } = useContext(PlayerContext);

  const playerAttack = player[status.attacking];
  const playerDefend = player[status.defending];

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
