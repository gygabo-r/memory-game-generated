import { useState } from 'react';
import './App.css';
import VictoryModal from './VictoryModal';
import GameGrid from './GameGrid';
import GameConfig, { type GameSettings } from './GameConfig';

type GameState = 'config' | 'playing';

function App() {
  const [gameState, setGameState] = useState<GameState>('config');
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleStartGame = (settings: GameSettings) => {
    setGameSettings(settings);
    setGameState('playing');
    setGameWon(false);
  };

  const handleGameWon = () => {
    setGameWon(true);
  };

  const handlePlayAgain = () => {
    setGameWon(false);
    setResetTrigger(prev => prev + 1);
  };

  const handleStartNew = () => {
    setGameState('config');
    setGameWon(false);
  };

  if (gameState === 'config') {
    return (
      <div className="app">
        <GameConfig onStartGame={handleStartGame} />
      </div>
    );
  }

  return (
    <div className="app">
      <GameGrid 
        onGameWon={handleGameWon} 
        resetTrigger={resetTrigger}
        settings={gameSettings!}
      />
      <VictoryModal 
        isOpen={gameWon} 
        onPlayAgain={handlePlayAgain}
        onStartNew={handleStartNew}
      />
    </div>
  );
}

export default App;
