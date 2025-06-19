export type GameSize = 4 | 16 | 24 | 36;
export type GameTheme = 'animals' | 'foods' | 'fruits' | 'nature' | 'travel';

export interface GameSettings {
  size: GameSize;
  theme: GameTheme;
  test?: boolean;
}

export interface GameConfigProps {
  onStartGame: (settings: GameSettings) => void;
}