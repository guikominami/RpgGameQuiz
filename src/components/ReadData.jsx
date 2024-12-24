import { useEffect, useState } from "react";
import questions from "../assets/questionsData.json";

export default function ReadData() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch(questions)
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let numeroSorteado = randomNumberInRange(1, questions.length);
  console.log("sorteio", numeroSorteado);
  console.log(questions[numeroSorteado].question);

  return (
    <div>
      <ul>
        {questions.map((item) => (
          <>
            <li>Question: {item.question}</li>
            <li>answer: {item.answer}</li>
            <li>a: {item.A}</li>
            <li>b: {item.B}</li>
            <li>c: {item.C}</li>
            <li>d: {item.D}</li>
            <span>--------</span>
          </>
        ))}
      </ul>
    </div>
  );
}
