interface VictoryModalProps {
  isOpen: boolean;
  onStartNewGame: () => void;
}

function VictoryModal({ isOpen, onStartNewGame }: VictoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="victory-modal">
      <div className="modal-content">
        <div className="party-emoji">🎉</div>
        <h2>You Won!</h2>
        <button onClick={onStartNewGame}>Start New Game</button>
      </div>
    </div>
  );
}

export default VictoryModal;