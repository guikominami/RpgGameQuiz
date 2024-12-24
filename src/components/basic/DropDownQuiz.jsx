/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./Button";
import { Themes } from "../../assets/questions";

import "./DropDownQuiz.css";

export default function DropDownQuiz({
  theme,
  onThemeSelected,
  isGameStarted,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // const [quizTheme, setQuizTheme] = useState("Quiz theme");

  function handleClick() {
    setIsOpen((opening) => !opening);
    // setQuizTheme("Quiz theme:");
    // onthemeSelected(false);
    onThemeSelected(undefined);
  }

  function handleSelectOption(option) {
    // setQuizTheme(option.name);
    setIsOpen((opening) => !opening);
    onThemeSelected(option);
  }

  return (
    <>
      <div className="dropdown-area">
        <Button
          className="theme"
          disabled={isOpen || isGameStarted}
          onClick={handleClick}
        >
          {theme === undefined ? "QUIZ THEME" : theme.name}
        </Button>
        {isOpen && (
          <ul>
            {Themes.map((item) => (
              <li key={item.id}>
                <Button
                  onClick={() => handleSelectOption(item)}
                  className="options"
                >
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
