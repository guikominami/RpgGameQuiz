/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import randomNumber from "../components/Basic/RandomNumber";
import Modal from "../components/Basic/Modal";
import RoundSummary from "../components/Summary/RoundSummary";
import GameSummary from "../components/Summary/GameSummary";

export const PlayerContext = createContext({
  player: [],
  status: {},
  gameStarted: false,
  nextRound: false,
  theme: undefined,
  updatePlayer: () => {},
  startGame: () => {},
  selectTheme: () => {},
  nextTurn: () => {},
  submitResultAttackDefense: () => {},
  finishRound: () => {},
  endGame: () => {},
});

export default function PlayerContextProvider({ children }) {
  const healthInicial = 1000;

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  const [statusPlayers, setStatusPlayers] = useState({
    activePlayer: 0,
    isAttacking: true,
    attacking: 0,
    defending: 1,
  });
  const [themeSelected, setThemeSelected] = useState(undefined);
  const [playerData, setPlayerData] = useState([
    {
      id: 0,
      name: "Player 1",
      power: 10,
      defense: 10,
      health: healthInicial,
      points: 0,
      dice: 0,
      multiplier: 0,
    },
    {
      id: 1,
      name: "Player 2",
      power: 10,
      defense: 10,
      health: healthInicial,
      points: 0,
      dice: 0,
      multiplier: 0,
    },
  ]);
  const [isModalEndRoundOpen, setIsModalEndRoundOpen] = useState(false);
  const [isModalEndGameOpen, setIsModalEndGameOpen] = useState(false);

  function handleUpdatePlayer(id, power, defense) {
    setPlayerData(
      playerData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            power: parseInt(power),
            defense: parseInt(defense),
          };
        } else {
          return item;
        }
      })
    );
  }

  function handleGameStart() {
    //se for igual verdadeiro, finalizar game.
    if (isGameStarted) {
      console.log("terminar game");
      handleEndOfGame();
      return;
    }

    //Aqui entra no começo ou no fim
    setIsGameStarted((value) => !value);
  }

  function handleThemeSelected(theme) {
    setThemeSelected(theme);
  }

  function handleNextTurn(resultQuestions) {
    let limitDice = 1;

    if (resultQuestions === 3) {
      limitDice = 2;
    }
    const diceResult = randomNumber(limitDice, 6);

    const resultQuestionsDice = diceResult * (parseInt(resultQuestions) + 1);

    const pointsAttackOrDefense = statusPlayers.isAttacking
      ? playerData[statusPlayers.activePlayer].power
      : playerData[statusPlayers.activePlayer].defense;

    const hitPoints = resultQuestionsDice * pointsAttackOrDefense;

    setPlayerData(
      playerData.map((item) => {
        if (item.id === playerData[statusPlayers.activePlayer].id) {
          return {
            ...item,
            points: hitPoints,
            dice: diceResult,
            multiplier:
              resultQuestions > 0
                ? parseInt(resultQuestions) + 1
                : resultQuestions,
          };
        } else {
          return item;
        }
      })
    );

    if (statusPlayers.isAttacking) {
      //Fim de turno é quando acabou o ataque
      setStatusPlayers((prevState) => ({
        ...prevState,
        activePlayer: prevState.activePlayer === 0 ? 1 : 0,
        isAttacking: !prevState.isAttacking,
      }));
    } else {
      setIsRoundFinished((roundStatus) => !roundStatus);
    }
  }

  function handleSubmitResultAttackDefense() {
    setIsRoundFinished((roundStatus) => !roundStatus);
    setIsModalEndRoundOpen(true);
  }

  function handleEndOfGame() {
    setIsGameStarted((value) => !value);
    setThemeSelected(undefined);
    setIsModalEndGameOpen(false);

    setStatusPlayers((prevState) => ({
      ...prevState,
      activePlayer: 0,
      isAttacking: true,
    }));

    setPlayerData(
      playerData.map((item) => {
        return {
          ...item,
          health: healthInicial,
          points: 0,
          dice: 0,
          multiplier: 0,
        };
      })
    );
  }

  function handleEndOfRound() {
    //Apenas no fim do round é que muda o status de quem está atacando e quem está defendendo.
    //ROUND 1: atacando 0 defendendo 1
    //ROUND 2: atacando 1 defendendo 0

    setIsModalEndRoundOpen(false);

    console.log("FIM DE ROUND");

    const hitPointsDifference =
      playerData[statusPlayers.attacking].points -
      playerData[statusPlayers.defending].points;

    let healthActive = playerData[statusPlayers.activePlayer].health;

    if (healthActive - hitPointsDifference < 0) {
      setIsModalEndGameOpen(true);
    }

    setPlayerData(
      playerData.map((item) => {
        if (item.id === playerData[statusPlayers.activePlayer].id) {
          return {
            ...item,
            health:
              hitPointsDifference > 0
                ? healthActive - hitPointsDifference
                : healthActive,
            points: 0,
            dice: 0,
            multiplier: 0,
          };
        } else {
          return {
            ...item,
            points: 0,
            dice: 0,
            multiplier: 0,
          };
        }
      })
    );

    setStatusPlayers((prevState) => ({
      ...prevState,
      activePlayer: prevState.attacking === 0 ? 1 : 0,
      isAttacking: !prevState.isAttacking,
      attacking: prevState.attacking === 0 ? 1 : 0,
      defending: prevState.defending === 1 ? 0 : 1,
    }));
  }

  const ctxValue = {
    player: playerData,
    status: statusPlayers,
    updatePlayer: handleUpdatePlayer,
    startGame: handleGameStart,
    selectTheme: handleThemeSelected,
    nextTurn: handleNextTurn,
    submitResultAttackDefense: handleSubmitResultAttackDefense,
    finishRound: handleEndOfRound,
    endGame: handleEndOfGame,
    gameStarted: isGameStarted,
    nextRound: isRoundFinished,
    theme: themeSelected,
  };

  return (
    <PlayerContext.Provider value={ctxValue}>
      <Modal
        buttonCaption="Ok"
        open={isModalEndRoundOpen}
        onClick={handleEndOfRound}
      >
        <RoundSummary />
      </Modal>
      <Modal
        open={isModalEndGameOpen}
        buttonCaption="Ok"
        onClick={handleEndOfGame}
      >
        <GameSummary
          playerAttack={playerData[statusPlayers.attacking]}
          playerDefend={playerData[statusPlayers.defending]}
        />
      </Modal>
      {children}
    </PlayerContext.Provider>
  );
}
