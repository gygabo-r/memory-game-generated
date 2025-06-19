# Project Overview

This is a React application built with Vite for fast development and optimized builds.

## Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: [CSS Modules/Tailwind/Styled Components/etc.]
- **State Management**: [Redux/Zustand/Context API/etc.]
- **Routing**: [React Router/etc.]

## Project Structure
```
src/
├── ComponentName/  # Each component has its own directory
├── PageName.jsx    # Page components as files in src
├── assets/         # Images, fonts, CSS files
└── App.jsx         # Main app component
```

## Development Guidelines

### Component Structure
- Each component gets its own directory in src/ (e.g., `GameGrid/`, `VictoryModal/`)
- Use functional components with hooks and proper TypeScript types
- Keep components focused on a single responsibility
- Define clear interfaces for component props
- Place component files, styles, and tests together in their directory
- **Each component must have its own CSS file** - avoid putting component styles in App.css
- Import component CSS files directly in the component TSX file

### State Management
- Use local state (useState) for component-specific data
- Use context for data that needs to be shared across multiple components
- **Prefer Sets over object properties for tracking state collections**
- Keep data interfaces minimal - avoid storing derived state in objects
- Use Sets for tracking flipped/matched cards instead of boolean properties in Card interface

### Styling
- Each component has its own CSS file in the component directory
- App.css contains only global styles and app-level layout
- Component CSS files are imported directly in the component TSX file
- Use consistent naming conventions for CSS classes
- Avoid component-specific styles in shared CSS files

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run linting

## Code Style & Linting Rules
- Use consistent indentation (2 spaces)
- Use meaningful variable and function names with proper TypeScript types
- Define interfaces for props and complex data structures
- Add comments for complex logic
- Follow React and TypeScript best practices
- Leverage TypeScript's type checking for better code quality
- Use ESLint with TypeScript support
- Follow React recommended rules
- Enforce consistent code formatting
- Use Prettier for automatic code formatting
- Run linting before commits to maintain code quality
- **Semicolons**: Ensure ESLint config includes:
  - `'semi': ['error', 'always']` rule to enforce semicolons on statements
  - `'@stylistic/member-delimiter-style'` rule to enforce semicolons in interfaces/types (requires `@stylistic/eslint-plugin`)

## Testing
[Add testing approach and commands when implemented]

## Notes for Claude Code
- When making changes, prioritize maintaining existing patterns and conventions
- Test changes in the browser after implementation
- Consider performance implications for any new features
- Maintain responsive design principles
