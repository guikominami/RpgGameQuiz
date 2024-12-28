/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Button from "./Button";
import { Themes } from "../../assets/questions";

import "./DropDownQuiz.css";

import { PlayerContext } from "../../context/player-context";

export default function DropDownQuiz({ isGameStarted }) {
  const [isOpen, setIsOpen] = useState(false);

  const { theme, selectTheme } = useContext(PlayerContext);

  function handleClick() {
    setIsOpen((opening) => !opening);
    // setQuizTheme("Quiz theme:");
    // onthemeSelected(false);
    selectTheme(undefined);
  }

  function handleSelectOption(option) {
    // setQuizTheme(option.name);
    setIsOpen((opening) => !opening);
    selectTheme(option);
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
