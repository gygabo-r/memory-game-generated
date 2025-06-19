import { useState, useEffect } from 'react';
import type {Card} from './types';
import { createCards } from './shuffledCards';

interface GameGridProps {
  onGameWon: () => void;
  resetTrigger: number;
}

function GameGrid({ onGameWon, resetTrigger }: GameGridProps) {
  const [cards, setCards] = useState<Card[]>(createCards());
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [matchedCards, setMatchedCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    setCards(createCards());
    setFlippedCards(new Set());
    setMatchedCards(new Set());
  }, [resetTrigger]);

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

  return (
    <div className="game-grid">
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