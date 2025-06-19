import { useState } from 'react';
import './App.css';
import VictoryModal from './VictoryModal';
import GameGrid from './GameGrid';

function App() {
  const [gameWon, setGameWon] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleGameWon = () => {
    setGameWon(true);
  };

  const resetGame = () => {
    setGameWon(false);
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <GameGrid onGameWon={handleGameWon} resetTrigger={resetTrigger} />
      <VictoryModal isOpen={gameWon} onStartNewGame={resetGame} />
    </div>
  );
}

export default App;
