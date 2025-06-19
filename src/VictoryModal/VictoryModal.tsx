import './VictoryModal.css';

interface VictoryModalProps {
  isOpen: boolean;
  onPlayAgain: () => void;
  onStartNew: () => void;
}

function VictoryModal({ isOpen, onPlayAgain, onStartNew }: VictoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="victory-modal">
      <div className="modal-content">
        <div className="party-emoji">🎉</div>
        <h2>You Won!</h2>
        <div className="modal-buttons">
          <button className="play-again-button" onClick={onPlayAgain}>
            Play Again
          </button>
          <button className="start-new-button" onClick={onStartNew}>
            Start New
          </button>
        </div>
      </div>
    </div>
  );
}

export default VictoryModal;