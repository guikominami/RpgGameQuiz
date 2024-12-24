/* eslint-disable react/prop-types */
import "./RoundSummary.css";

export default function RoundSummaryColumn({
  name,
  type,
  multiplier,
  dice,
  power,
  points,
}) {
  return (
    <div className="column-summary">
      <p>
        <b>
          {name} -{type}
        </b>
      </p>
      <p>{multiplier} x (multiplier for correct answer)</p>
      <p>{dice} + (dice result)</p>
      <p>{power} = (Power)</p>
      <p>
        <b>{points}</b> (Hit points)
      </p>
    </div>
  );
}
