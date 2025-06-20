import { useEffect, useRef } from 'react';
import './VictoryModal.css';

interface VictoryModalProps {
  isOpen: boolean;
  onPlayAgain: () => void;
  onStartNew: () => void;
}

function VictoryModal({ isOpen, onPlayAgain, onStartNew }: VictoryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && firstButtonRef.current) {
      firstButtonRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (event.key === 'Escape') {
        onStartNew();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onStartNew]);

  if (!isOpen) return null;

  return (
    <div 
      className="victory-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="victory-title"
      ref={modalRef}
    >
      <div className="modal-content">
        <div className="party-emoji" aria-hidden="true">🎉</div>
        <h2 id="victory-title">You Won!</h2>
        <div className="modal-buttons">
          <button 
            ref={firstButtonRef}
            className="play-again-button" 
            onClick={onPlayAgain}
            aria-label="Play again with same settings"
          >
            Play Again
          </button>
          <button 
            className="start-new-button" 
            onClick={onStartNew}
            aria-label="Return to game options to change settings"
          >
            Game Options
          </button>
        </div>
      </div>
    </div>
  );
}

export default VictoryModal;