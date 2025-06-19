import { useState, useEffect } from 'react';
import type { GameSize, GameTheme, GameConfigProps, GameSettings } from './types';
import './GameConfig.css';
import animalIcons from '../GameGrid/icons/animal_icons.json';
import foodDrinksIcons from '../GameGrid/icons/food_drinks_icons.json';
import fruitVegetableIcons from '../GameGrid/icons/fruit_vegetable_icons.json';
import natureIcons from '../GameGrid/icons/nature_icons.json';
import travelIcons from '../GameGrid/icons/travel_icons.json';

const STORAGE_KEY = 'memory-game-settings';

const defaultSettings: GameSettings = {
  size: 16,
  theme: 'animals'
};

const themeIcons = {
  animals: Object.values(animalIcons)[0],
  foods: Object.values(foodDrinksIcons)[0],
  fruits: Object.values(fruitVegetableIcons)[0],
  nature: Object.values(natureIcons)[0],
  travel: Object.values(travelIcons)[0]
};

function GameConfig({ onStartGame }: GameConfigProps) {
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved);
        setSettings(parsedSettings);
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  const isTestMode = settings.test === true;

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleStartGame = () => {
    onStartGame(settings);
  };

  return (
    <div className="game-config">
      <h1>Memory Game</h1>
      
      <div className="config-section">
        <h2>Grid Size</h2>
        <div className="size-selector">
          {(isTestMode ? [4, 16, 24, 36] : [16, 24, 36] as GameSize[]).map(size => (
            <button
              key={size}
              className={`size-button ${settings.size === size ? 'selected' : ''}`}
              onClick={() => updateSettings({ size })}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="config-section">
        <h2>Theme</h2>
        <div className="theme-selector">
          {(['animals', 'foods', 'fruits', 'nature', 'travel'] as GameTheme[]).map(theme => (
            <button
              key={theme}
              className={`theme-button ${settings.theme === theme ? 'selected' : ''}`}
              onClick={() => updateSettings({ theme })}
            >
              <span className="theme-icon">{themeIcons[theme]}</span>
              <span className="theme-name">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>

      <button className="start-button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
}

export default GameConfig;