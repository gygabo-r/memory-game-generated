import { useState, useEffect } from 'react';
import type {Card} from './types';
import { createCards } from './shuffledCards';
import type { GameSettings } from '../GameConfig';
import './GameGrid.css';

interface GameGridProps {
  onGameWon: () => void;
  resetTrigger: number;
  settings: GameSettings;
}

function GameGrid({ onGameWon, resetTrigger, settings }: GameGridProps) {
  const [cards, setCards] = useState<Card[]>(createCards(settings));
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [matchedCards, setMatchedCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    setCards(createCards(settings));
    setFlippedCards(new Set());
    setMatchedCards(new Set());
  }, [resetTrigger, settings]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.size === 2) return;
    if (flippedCards.has(cardId)) return;
    if (matchedCards.has(cardId)) return;

    const newFlippedCards = new Set([...flippedCards, cardId]);
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.size === 2) {
      const [firstId, secondId] = Array.from(newFlippedCards);
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard?.emoji === secondCard?.emoji) {
        setMatchedCards(prev => new Set([...prev, firstId, secondId]));
        setFlippedCards(new Set());
        
        const newMatchedCount = matchedCards.size + 2;
        if (newMatchedCount === cards.length) {
          onGameWon();
        }
      } else {
        setTimeout(() => {
          setFlippedCards(new Set());
        }, 1000);
      }
    }
  };

  const getGridClass = () => {
    const size = settings.size;
    if (size === 4) return 'game-grid grid-2x2';
    if (size === 16) return 'game-grid grid-4x4';
    if (size === 24) return 'game-grid grid-6x4';
    if (size === 36) return 'game-grid grid-6x6';
    return 'game-grid grid-4x4';
  };

  return (
    <div className={getGridClass()}>
      {cards.map(card => (
        <div 
          key={card.id}
          className={`card ${flippedCards.has(card.id) || matchedCards.has(card.id) ? 'flipped' : ''}`}
          onClick={() => handleCardClick(card.id)}
        >
          <div className="card-inner">
            <div className="card-front"></div>
            <div className="card-back">{card.emoji}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameGrid;