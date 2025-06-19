import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Start Page', () => {

  describe('Size Options', () => {
    it('should display all size options except test mode', () => {
      render(<App />);
      
      const expectedSizes = [16, 24, 36];
      const testModeSize = 4;
      
      // Check that normal size options are present
      expectedSizes.forEach(size => {
        expect(screen.getByRole('button', { name: String(size) })).toBeInTheDocument();
      });
      
      // Check that test mode size is not present
      expect(screen.queryByRole('button', { name: String(testModeSize) })).not.toBeInTheDocument();
    });
  });

  describe('Theme Options', () => {
    it('should display theme buttons with icons and names', () => {
      render(<App />);
      
      const themes = ['animals', 'foods', 'fruits', 'nature', 'travel'];
      
      themes.forEach(theme => {
        const button = screen.getByRole('button', { name: new RegExp(theme, 'i') });
        expect(button.querySelector('.theme-icon')).toBeInTheDocument();
        expect(button.querySelector('.theme-name')).toBeInTheDocument();
      });
    });
  });
});