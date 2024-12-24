/* eslint-disable react/prop-types */
import RoundSummaryColumn from "./RoundSummaryColumn";
import "./RoundSummary.css";

export default function RoundSummary({ playerAttack, playerDefend }) {
  const damage = playerAttack.points - playerDefend.points;

  return (
    <>
      <h2>End of Round</h2>
      <div className="main-summary">
        <RoundSummaryColumn
          type="Attack"
          name={playerAttack.name}
          multiplier={playerAttack.multiplier}
          dice={playerAttack.dice}
          power={playerAttack.power}
          points={playerAttack.points}
        />
        <RoundSummaryColumn
          name={playerDefend.name}
          type="Block"
          multiplier={playerDefend.multiplier}
          dice={playerDefend.dice}
          power={playerDefend.power}
          points={playerDefend.points}
        />
      </div>
      <div className="result-summary">
        <p>
          <b>Round Result: </b>
        </p>
        <p>
          Hit Points (Attack - Defense) :{" "}
          <b>
            {playerAttack.points} - {playerDefend.points}
          </b>
        </p>

        <p>
          {" "}
          Damage:{" "}
          <b>
            {damage < 0
              ? "0 (attack points less than defense points)"
              : damage}
          </b>
        </p>
        <p>
          Player {playerDefend.id + 1} health :{" "}
          {damage > 0 ? (
            <b>
              {playerDefend.health} - {damage} ={" "}
              {playerDefend.health - damage}
            </b>
          ) : (
            <b>{playerDefend.health}</b>
          )}
        </p>
      </div>
    </>
  );
}
