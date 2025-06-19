import type { Card } from './types';
import animalIcons from './icons/animal_icons.json';
import foodDrinksIcons from './icons/food_drinks_icons.json';
import fruitVegetableIcons from './icons/fruit_vegetable_icons.json';
import natureIcons from './icons/nature_icons.json';
import objectIcons from './icons/object_icons.json';
import travelIcons from './icons/travel_icons.json';

// Combine all icon objects into a single array of emojis
const allIcons = [
  ...Object.values(animalIcons),
  ...Object.values(foodDrinksIcons),
  ...Object.values(fruitVegetableIcons),
  ...Object.values(natureIcons),
  ...Object.values(objectIcons),
  ...Object.values(travelIcons)
];

// Function to get 8 unique random icons
function getRandomUniqueIcons(icons: string[], count: number): string[] {
  const shuffled = shuffleArray([...icons]);
  const uniqueEmojis = new Set<string>();
  const result: string[] = [];
  
  for (const emoji of shuffled) {
    if (uniqueEmojis.has(emoji)) continue;
    uniqueEmojis.add(emoji);
    result.push(emoji);
    if (result.length === count) break;
  }
  
  return result;
}

// Get 8 unique random emojis from all available icons
const animalEmojis = getRandomUniqueIcons(allIcons, 8);

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function createCards(): Card[] {
  const cardPairs = [...animalEmojis, ...animalEmojis];
  const shuffledEmojis = shuffleArray(cardPairs);
  
  return shuffledEmojis.map((emoji, index) => ({
    id: index,
    emoji
  }));
}