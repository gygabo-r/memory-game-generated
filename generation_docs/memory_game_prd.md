# Memory Game - Product Requirements Document

## Project Overview

A simple, responsive memory card game built with Vite and CSS, featuring UTF-8 emoji icons. The game challenges players to match pairs of cards in a 4x4 grid through visual memory and pattern recognition.

## Technical Stack

- **Styling**: CSS (vanilla)
- **Icons**: UTF-8 Emoji characters
- **Testing**: Custom automated test implementation

## Game Specifications

### Grid Layout
- **Size**: 4x4 grid (16 tiles total)
- **Pairs**: 8 unique pairs of matching icons randomly selected from combined icon sets
- **Responsive**: Grid adapts to fill available screen space
- **Icons**: UTF-8 emoji characters sourced from multiple JSON files (animals, food, nature, objects, travel, fruits)

### Game Mechanics

#### Initialization
- Game starts automatically when page loads
- Icons are randomly shuffled and distributed across the grid
- All tiles start face-down (showing back design)

#### Gameplay Flow
1. Player clicks first tile → tile flips with animation
2. Player clicks second tile → tile flips with animation
3. **Match Logic**:
   - If tiles match: both remain face-up permanently
   - If tiles don't match: both flip back face-down after brief delay
4. Process repeats until all pairs are matched
5. Game completion triggers victory modal

#### Victory Condition
- VictoryModal component appears when all 8 pairs are successfully matched
- VictoryModal contains:
  - Large party popper emoji (🎉) as primary visual element
  - "You Won!" congratulatory text
  - "Start New Game" button to reset and play again

### User Interface Requirements

#### Visual Design
- Clean, modern interface
- Smooth flip animations for card interactions
- Responsive design that works on desktop and mobile
- Attractive color scheme and typography
- Visual feedback for user interactions

#### Responsiveness
- Grid scales appropriately for different screen sizes
- Maintains aspect ratio and usability on mobile devices
- Touch-friendly tile sizes for mobile interaction
- Optimal spacing and layout across all viewport sizes

## Testing Requirements

### Automated Test Implementation
An automated test suite that simulates gameplay using a systematic solving strategy:

#### Test Strategy Algorithm
1. **First Tile Selection**: Always click the first unturned tile in grid order
2. **Second Tile Selection**: Click the next unturned tile that hasn't been paired with the first tile yet
3. **Memory System**: Track which tiles have been revealed and their positions
4. **Match Resolution**: Continue until match is found, then move to next unpaired tile
5. **Game Completion**: Detect when all pairs are matched
6. **Reset Cycle**: Automatically start new game and repeat testing

#### Test Validation Points
- Verify tile flip animations execute properly
- Confirm match detection logic works correctly
- Validate non-matching tiles flip back correctly
- Ensure victory modal appears at game completion
- Test new game functionality resets state properly
- Performance testing for animation smoothness

## Development Tasks

### Phase 1: Core Game Implementation
- [x] Initialize Vite project structure
- [x] Set up basic HTML structure
- [x] Create CSS reset and base styles
- [x] Implement responsive grid layout system
- [x] Create tile data structure and state management
- [x] Implement random shuffle algorithm for icon distribution
- [x] Build tile flip animation system
- [x] Develop match detection and validation logic
- [x] Create game state management (in-progress, completed)
- [x] Design and implement tile visual states (face-down, face-up, matched)
- [x] Create smooth CSS animations for tile flipping
- [x] Implement click event handling and user interaction
- [x] Build GameGrid component in separate directory to handle all game logic
- [x] Extract card state management, click handling, and match detection to GameGrid
- [x] Use Sets for flippedCards and matchedCards state instead of storing state in Card interface
- [x] Keep Card interface minimal with only id and emoji properties
- [x] Organize GameGrid directory with types.ts for interfaces and shuffledCards.ts for utilities
- [x] Separate Card interface into types.ts file within GameGrid directory
- [x] Extract shuffleArray and createCards functions into shuffledCards.ts utility file
- [x] Import and combine multiple JSON icon sets (animals, food, nature, objects, travel, fruits)
- [x] Randomly select 8 unique icons from combined icon pool for each game session
- [x] Use type imports for better TypeScript performance and clarity
- [x] Implement centered app layout with gradient background
- [x] Use HTML document title for game branding instead of in-page h1 element
- [x] Build VictoryModal component in separate directory with specific content
- [x] Include party popper icon, "You Won!" text, and new game button in VictoryModal
- [x] Style VictoryModal with proper modal overlay and content styling
- [x] Apply black text-shadow outline to emoji icons for better visibility against gradient backgrounds
- [x] Implement flexible grid system that scales with viewport
- [x] Test and optimize for mobile touch interactions
- [x] Ensure proper spacing and proportions across screen sizes
- [x] Optimize performance for smooth animations on all devices

### Phase 2: Game Configuration Interface
- [x] Create game size selector with 16, 24, and 36 tile options
- [x] Design size selector buttons with proportional visual differences
- [x] Implement theme selector for animals, foods, fruits, nature, and travel categories
- [x] Design theme selector buttons with distinct selected state styling
- [x] Display representative icons from each theme's JSON file on theme buttons
- [x] Set default selections: 16 tiles and animals theme
- [x] Implement localStorage persistence for user selections
- [x] Create game configuration page/screen before game starts with green "Start Game" button
- [x] Update VictoryModal to include two action buttons
- [x] Add "Play Again" button (primary style in green color) to restart with same settings
- [x] Add "Game Options" button (secondary style in beige color) to return to configuration screen
- [x] Implement navigation flow between configuration and game screens
- [x] Add test mode functionality with 2x2 grid option (4 tiles) visible only when test: true is stored in game settings

### Phase 3: Testing Suite Development
- [x] Set up Vitest testing framework
- [x] Build an all cases test
  - [x] Create test which at first tests the start page, entry point is App.tsx, display all the options except the test mode option
- [x] Check game flow test
  - [x] Create comprehensive game flow test that validates configuration to completion workflow
  - [x] Test configuration selection: user selects size 16 and theme fruits, then can start the game
  - [x] Implement systematic game solving test with specific algorithm:
    - Click first hidden tile
    - Check next hidden tile - if match, move to next 'first' hidden tile and repeat
    - If no match, click first tile again to hide, then move to next hidden tile
    - Continue systematic process until all pairs are found and game is won
  - [x] Validate victory modal appears and new game functionality works correctly
- [x] Add test result logging and validation


### Phase 4: Polish and Optimization
- [x] Performance optimization for animations
- [x] Cross-browser compatibility testing
- [x] Accessibility improvements (keyboard navigation, screen readers)
- [x] Code cleanup and documentation
- [x] Final responsive design testing

### Phase 5: CI/CD and Deployment
- [x] Create GitHub Actions workflow for automated testing and deployment
- [x] Configure automated build process on push to main branch
- [x] Set up automated test execution with failure prevention
- [x] Implement GitHub Pages deployment pipeline
- [x] Configure Vite for GitHub Pages base path
- [x] Add deployment status badges and documentation

### Phase 6: Progressive Web App Implementation (Minimal Changes)
- [ ] Create basic web app manifest file with minimal required properties
- [ ] Add manifest link to existing index.html
- [ ] Add basic PWA meta tags to index.html (theme-color, apple-mobile-web-app-capable)
- [ ] Test PWA installation prompt on supported browsers
- [ ] Verify installable app experience works correctly

## Success Criteria

### Functional Requirements
- ✅ Game initializes automatically with random icon distribution
- ✅ Smooth tile flip animations on user interaction
- ✅ Accurate match detection and game state management
- ✅ GameGrid component handles all game logic and state management
- ✅ VictoryModal component appears with correct styling and functionality
- ✅ New game functionality completely resets game state

### Performance Requirements
- ✅ Animations run smoothly at 60fps on modern devices
- ✅ Game loads quickly (under 1 second initial load)
- ✅ Responsive across all common screen sizes (320px to 1920px width)
- ✅ Touch interactions work reliably on mobile devices

### Testing Requirements
- [ ] Automated test successfully completes games using specified algorithm
- [ ] Test can run continuously without manual intervention
- [ ] All game mechanics function correctly under automated testing
- [ ] Performance remains stable during extended automated testing

### Progressive Web App Requirements (Phase 6)
- [ ] Basic web app manifest with minimal required metadata
- [ ] PWA installation prompt appears on supported browsers
- [ ] App can be installed to home screen and launched standalone
- [ ] No service worker needed - relies on browser caching
- [ ] No complex PWA features or custom install prompts - browser-native only


## Future Enhancements (Out of Scope)
- Difficulty levels with different grid sizes
- Sound effects and audio feedback
