import type { Card } from './types';
import type { GameSettings } from '../GameConfig';
import animalIcons from './icons/animal_icons.json';
import foodDrinksIcons from './icons/food_drinks_icons.json';
import fruitVegetableIcons from './icons/fruit_vegetable_icons.json';
import natureIcons from './icons/nature_icons.json';
import travelIcons from './icons/travel_icons.json';

const iconSets = {
  animals: Object.values(animalIcons),
  foods: Object.values(foodDrinksIcons),
  fruits: Object.values(fruitVegetableIcons),
  nature: Object.values(natureIcons),
  travel: Object.values(travelIcons)
};

// Function to get unique random icons
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

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function createCards(settings: GameSettings): Card[] {
  const pairCount = settings.size / 2;
  const themeIcons = iconSets[settings.theme];
  const selectedEmojis = getRandomUniqueIcons(themeIcons, pairCount);
  const cardPairs = [...selectedEmojis, ...selectedEmojis];
  const shuffledEmojis = shuffleArray(cardPairs);
  
  return shuffledEmojis.map((emoji, index) => ({
    id: index,
    emoji
  }));
}