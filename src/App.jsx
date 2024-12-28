import Player from "./components/Player";
import SetupGame from "./components/SetupGame";
import StatusGame from "./components/StatusGame";
import PlayerContextProvider from "./context/player-context";

function App() {
  return (
    <PlayerContextProvider>
      <div id="main-area">
        <Player playerId={0} />
        <Player playerId={1} />
        <SetupGame />
        <StatusGame />
      </div>
    </PlayerContextProvider>
  );
}

export default App;
