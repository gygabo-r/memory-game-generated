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

  const handleKeyDown = (event: React.KeyboardEvent, cardId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(cardId);
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

  const getCardState = (cardId: number) => {
    if (matchedCards.has(cardId)) return 'matched';
    if (flippedCards.has(cardId)) return 'flipped';
    return 'face-down';
  };

  const getAriaLabel = (card: Card) => {
    const state = getCardState(card.id);
    const position = card.id + 1;
    
    if (state === 'matched') {
      return `Card ${position}: ${card.emoji}, matched`;
    } else if (state === 'flipped') {
      return `Card ${position}: ${card.emoji}, face up`;
    } else {
      return `Card ${position}: face down, press Enter or Space to flip`;
    }
  };

  return (
    <div 
      className={getGridClass()}
      role="grid"
      aria-label={`Memory game grid with ${cards.length} cards`}
    >
      {cards.map((card) => (
        <div 
          key={card.id}
          className={`card ${flippedCards.has(card.id) || matchedCards.has(card.id) ? 'flipped' : ''}`}
          onClick={() => handleCardClick(card.id)}
          onKeyDown={(e) => handleKeyDown(e, card.id)}
          tabIndex={0}
          role="gridcell"
          aria-label={getAriaLabel(card)}
          aria-pressed={flippedCards.has(card.id) || matchedCards.has(card.id)}
          aria-disabled={matchedCards.has(card.id)}
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