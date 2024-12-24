/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./Basic/Button";
import "./StatusGame.css";
import randomNumber from "./Basic/RandomNumber";
import {} from "../assets/questions";

export default function StatusGame({
  onNextTurn,
  isAttacking,
  playerNameAttacking,
  playerNameDefending,
  isRoundFinished,
  onFinishRound,
  questionsTheme,
}) {
  const [isQuestion, setIsQuestion] = useState(true);
  const [questionActive, setQuestionActive] = useState(
    randomNumber(1, questionsTheme.length - 1)
  );
  const [quantityAnswers, setQuantityAnswers] = useState({
    quantity: 0,
    correct: 0,
  });

  function handleNextTurnClick() {
    setIsQuestion(true);

    setQuantityAnswers({
      ...quantityAnswers,
      quantity: 0,
      correct: 0,
    });

    onNextTurn(quantityAnswers.correct);
  }

  function handleQuestionOption(option) {
    let correctAnswerCount = 0;

    const correctAnswer = questionsTheme[questionActive].answer;

    if (option === correctAnswer) {
      correctAnswerCount = 1;
    }

    setQuantityAnswers({
      ...quantityAnswers,
      quantity: quantityAnswers.quantity + 1,
      correct: quantityAnswers.correct + correctAnswerCount,
    });

    setQuestionActive(randomNumber(1, questionsTheme.length - 1));

    if (quantityAnswers.quantity === 2) {
      setIsQuestion(false);
    }
  }

  return (
    <section className="status-game">
      <div className="status-game-column">
        <h3>
          {isAttacking ? playerNameAttacking : playerNameDefending}{" "}
          ANSWER FOR {isAttacking ? "ATTACK" : "DEFENSE"}{" "}
        </h3>
        {isQuestion && !isRoundFinished && (
          <>
            <p>
              <b>Question: </b>
              {questionsTheme[questionActive].question}
            </p>

            <div className="question-options">
              <Button onClick={() => handleQuestionOption("A")}>
                {questionsTheme[questionActive].A}
              </Button>
              <Button onClick={() => handleQuestionOption("B")}>
                {questionsTheme[questionActive].B}
              </Button>
              <Button onClick={() => handleQuestionOption("C")}>
                {questionsTheme[questionActive].C}
              </Button>
              <Button onClick={() => handleQuestionOption("D")}>
                {questionsTheme[questionActive].D}
              </Button>
            </div>
          </>
        )}
        {!isQuestion && !isRoundFinished && (
          <div className="next-turn">
            <p>
              You answered {quantityAnswers.correct} correct from{" "}
              {quantityAnswers.quantity} questions!
            </p>
            <Button onClick={handleNextTurnClick}>Next Turn</Button>
          </div>
        )}
        {isRoundFinished && (
          <div className="next-turn">
            <p>
              Finish round to view the detailed result of attack x
              defense!
            </p>
            <Button onClick={onFinishRound}>Finish Round</Button>
          </div>
        )}
      </div>
    </section>
  );
}
