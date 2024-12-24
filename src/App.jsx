import { useState, useRef } from "react";
import Player from "./components/Player";
import SetupGame from "./components/SetupGame";
import StatusGame from "./components/StatusGame";
import randomNumber from "./components/Basic/RandomNumber";
import Modal from "./components/Basic/Modal";
import RoundSummary from "./components/Summary/RoundSummary";
import GameSummary from "./components/Summary/GameSummary";

function App() {
  const modalEndRound = useRef();
  const modalEndGame = useRef();

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

  function handleGameStart(gameStatus) {
    //se for igual verdadeiro, finalizar game.
    if (gameStatus) {
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
    console.log(resultQuestions);

    let limitDice = 1;

    if (resultQuestions === 3) {
      limitDice = 2;
    }
    const diceResult = randomNumber(limitDice, 6);

    const resultQuestionsDice =
      diceResult * (parseInt(resultQuestions) + 1);

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
      // setTimeout(() => {
      //   modal.current.open();
      // }, 1000);
      setIsRoundFinished((roundStatus) => !roundStatus);
    }
  }

  function handleSubmitResultAttackDefense() {
    setIsRoundFinished((roundStatus) => !roundStatus);
    modalEndRound.current.open();
  }

  function handleEndOfGame() {
    setIsGameStarted((value) => !value);
    setThemeSelected(undefined);

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

    console.log("FIM DE ROUND");

    const hitPointsDifference =
      playerData[statusPlayers.attacking].points -
      playerData[statusPlayers.defending].points;

    let healthActive = playerData[statusPlayers.activePlayer].health;

    if (healthActive - hitPointsDifference < 0) {
      modalEndGame.current.open();
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

  return (
    <>
      <Modal
        ref={modalEndRound}
        buttonCaption="Ok"
        onClick={handleEndOfRound}
      >
        <RoundSummary
          playerAttack={playerData[statusPlayers.attacking]}
          playerDefend={playerData[statusPlayers.defending]}
        />
      </Modal>
      <Modal
        ref={modalEndGame}
        buttonCaption="Ok"
        onClick={handleEndOfGame}
      >
        <GameSummary
          playerAttack={playerData[statusPlayers.attacking]}
          playerDefend={playerData[statusPlayers.defending]}
        />
      </Modal>
      <div id="main-area">
        <Player
          playerData={playerData[0]}
          onGameStart={isGameStarted}
          onPointsUpdate={handleUpdatePlayer}
          activePlayer={statusPlayers.activePlayer}
        />
        <Player
          playerData={playerData[1]}
          onGameStart={isGameStarted}
          onPointsUpdate={handleUpdatePlayer}
          activePlayer={statusPlayers.activePlayer}
        />

        <SetupGame
          onGameStart={handleGameStart}
          isGameStarted={isGameStarted}
          onThemeSelected={handleThemeSelected}
          theme={themeSelected}
        />
        {isGameStarted && (
          <>
            <StatusGame
              onNextTurn={handleNextTurn}
              isAttacking={statusPlayers.isAttacking}
              playerNameAttacking={
                playerData[statusPlayers.attacking].name
              }
              playerNameDefending={
                playerData[statusPlayers.defending].name
              }
              isRoundFinished={isRoundFinished}
              onFinishRound={handleSubmitResultAttackDefense}
              questionsTheme={themeSelected.object}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
