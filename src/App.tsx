import { useState } from 'react';
import './App.css';
import VictoryModal from './VictoryModal';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const animalEmojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createCards(): Card[] {
  const cardPairs = [...animalEmojis, ...animalEmojis];
  const shuffledEmojis = shuffleArray(cardPairs);
  
  return shuffledEmojis.map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false
  }));
}

function App() {
  const [cards, setCards] = useState<Card[]>(createCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameWon, setGameWon] = useState(false);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards.find(card => card.id === cardId)?.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard?.emoji === secondCard?.emoji) {
        setCards(prev => prev.map(card => 
          newFlippedCards.includes(card.id) 
            ? { ...card, isMatched: true }
            : card
        ));
        setFlippedCards([]);
        
        const allMatched = cards.filter(card => !newFlippedCards.includes(card.id)).every(card => card.isMatched);
        if (allMatched) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            newFlippedCards.includes(card.id) 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setGameWon(false);
  };

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <div className="game-grid">
        {cards.map(card => (
          <div 
            key={card.id}
            className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front"></div>
              <div className="card-back">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>
      
      <VictoryModal isOpen={gameWon} onStartNewGame={resetGame} />
    </div>
  );
}

export default App;
