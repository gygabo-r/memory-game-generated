export type GameSize = 16 | 24 | 36;
export type GameTheme = 'animals' | 'foods' | 'fruits' | 'nature' | 'travel';

export interface GameSettings {
  size: GameSize;
  theme: GameTheme;
}

export interface GameConfigProps {
  onStartGame: (settings: GameSettings) => void;
}