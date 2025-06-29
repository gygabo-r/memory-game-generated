import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../App';

describe('App Start Page', () => {

  describe('Size Options', () => {
    it('should display all size options except test mode', () => {
      render(<App />);
      
      const expectedSizes = [16, 24, 36];
      const testModeSize = 4;
      
      // Check that normal size options are present
      expectedSizes.forEach(size => {
        expect(screen.getByText(String(size))).toBeInTheDocument();
      });
      
      // Check that test mode size is not present
      expect(screen.queryByText(String(testModeSize))).not.toBeInTheDocument();
    });
  });

  describe('Theme Options', () => {
    it('should display theme buttons with icons and names', () => {
      render(<App />);
      
      const themes = ['animals', 'foods', 'fruits', 'nature', 'travel'];
      
      themes.forEach(theme => {
        const button = screen.getByRole('radio', { name: new RegExp(`${theme} theme`, 'i') });
        expect(button.querySelector('.theme-icon')).toBeTruthy();
        expect(button.querySelector('.theme-name')).toBeTruthy();
      });
    });
  });
});

describe('Game Flow Test', () => {
  it('should complete full game flow from config to victory', async () => {
    render(<App />);

    await startTheGame();

    const tiles = Array.from(document.querySelectorAll('.card'));
    expect(tiles).toHaveLength(16);
    
    let matchedCount = 0;
    
    for (let firstIndex = 0; firstIndex < tiles.length && matchedCount < 16; firstIndex++) {
      const firstTile = tiles[firstIndex];
      if (firstTile.classList.contains('flipped')) continue;
      await clickTile(firstTile);
      matchedCount = await findMatch(firstIndex, tiles, firstTile, matchedCount);
    }
    
    await waitFor(() => {
      expect(document.querySelector('.victory-modal')).toBeInTheDocument();
    }, { timeout: 10000 });
    
    expect(screen.getByText('You Won!')).toBeInTheDocument();
  }, 600000);
});

async function clickTile(firstTile: Element, timeOut: number = 200) {
  await act(async () => {
    fireEvent.click(firstTile);
    await new Promise(r => setTimeout(r, timeOut));
  });
}

async function findMatch(firstIndex: number, tiles: Element[], firstTile: Element, matchedCount: number) {
  for (let secondIndex = firstIndex + 1; secondIndex < tiles.length; secondIndex++) {
    const secondTile = tiles[secondIndex];

    if (secondTile.classList.contains('flipped')) continue;
    await clickTile(secondTile, 1200);

    if (firstTile.classList.contains('flipped') && secondTile.classList.contains('flipped')) {
      return matchedCount += 2;
    }
    await clickTile(firstTile);
  }
  return matchedCount;
}

async function startTheGame() {
  await act(async () => {
    fireEvent.click(screen.getByText('16'));
    fireEvent.click(screen.getByRole('radio', {name: 'Fruits theme'}));
    fireEvent.click(screen.getByRole('button', {name: /start memory game/i}));
  });

  await waitFor(() => {
    expect(document.querySelector('.game-grid')).toBeInTheDocument();
  });
}