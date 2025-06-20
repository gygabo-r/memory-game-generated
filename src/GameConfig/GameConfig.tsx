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
        <h2 id="size-heading">Grid Size</h2>
        <div 
          className="size-selector"
          role="radiogroup"
          aria-labelledby="size-heading"
        >
          {(isTestMode ? [4, 16, 24, 36] as GameSize[] : [16, 24, 36] as GameSize[]).map(size => (
            <button
              key={size}
              className={`size-button ${settings.size === size ? 'selected' : ''}`}
              onClick={() => updateSettings({ size })}
              role="radio"
              aria-checked={settings.size === size}
              aria-label={`${size} tiles grid`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="config-section">
        <h2 id="theme-heading">Theme</h2>
        <div 
          className="theme-selector"
          role="radiogroup"
          aria-labelledby="theme-heading"
        >
          {(['animals', 'foods', 'fruits', 'nature', 'travel'] as GameTheme[]).map(theme => (
            <button
              key={theme}
              className={`theme-button ${settings.theme === theme ? 'selected' : ''}`}
              onClick={() => updateSettings({ theme })}
              role="radio"
              aria-checked={settings.theme === theme}
              aria-label={`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme`}
            >
              <span className="theme-icon" aria-hidden="true">{themeIcons[theme]}</span>
              <span className="theme-name">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>

      <button 
        className="start-button" 
        onClick={handleStartGame}
        aria-label={`Start memory game with ${settings.size} tiles and ${settings.theme} theme`}
      >
        Start Game
      </button>
    </div>
  );
}

export default GameConfig;