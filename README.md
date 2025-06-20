# Memory Game

A responsive, accessible memory card matching game built as a Progressive Web App (PWA) with React and TypeScript.

## Features

- 🎮 **Multiple Game Modes**: 4x4, 6x4, and 6x6 grid sizes
- 🎨 **Theme Selection**: Animals, foods, fruits, nature, and travel themes
- 📱 **Progressive Web App**: Installable, works offline
- ♿ **Fully Accessible**: Keyboard navigation, screen reader support
- 🎯 **Responsive Design**: Works on all device sizes
- ⚡ **Optimized Performance**: Smooth animations, low-end device support
- 🧪 **Comprehensive Testing**: Automated test suite with Vitest

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Testing**: Vitest with React Testing Library
- **Styling**: CSS Modules with responsive design
- **PWA**: Service Worker, Web App Manifest
- **Accessibility**: ARIA labels, keyboard navigation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run test suite
- `npm run lint` - Run linting

## Game Rules

1. Click cards to flip them over
2. Match pairs of identical emojis
3. Game ends when all pairs are matched
4. Try to complete with as few clicks as possible!

## Accessibility Features

- **Keyboard Navigation**: Use Tab, Enter, and Space keys
- **Screen Reader Support**: Complete ARIA labels and descriptions
- **High Contrast Mode**: Automatic adaptation
- **Reduced Motion**: Respects user preferences
- **Focus Management**: Clear visual focus indicators

## PWA Features

- **Offline Play**: Game works without internet connection
- **Installation**: Add to home screen on mobile/desktop
- **Background Sync**: Automatic updates when online
- **App-like Experience**: Full-screen, no browser UI

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Project Structure

```
src/
├── GameGrid/          # Main game component
├── GameConfig/        # Game configuration screen
├── VictoryModal/      # Win celebration modal
├── InstallPrompt/     # PWA installation prompt
└── test/              # Test files
```

### Testing

Run automated tests: `npm test`

Includes:
- Unit tests for components
- Integration tests for game flow
- Accessibility validation
- Performance testing

## Deployment

### Automatic Deployment

The project includes a GitHub Actions workflow that automatically:

1. **Builds** the application
2. **Tests** all functionality
3. **Deploys** to GitHub Pages (on push to main branch)

The workflow runs on every push and pull request to ensure code quality.

### Manual Deployment

To deploy manually:

```bash
npm run build
# Deploy dist/ folder to any static hosting service
```

### GitHub Pages Setup

1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to main branch to trigger deployment

The app will be available at: `https://[username].github.io/memory-game-generated/`

## License

MIT License
