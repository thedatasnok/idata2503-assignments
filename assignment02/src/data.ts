import { Category, Recipe } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'italian',
    name: 'Italian',
    recipes: [],
  },
];

export const RECIPES: Recipe[] = CATEGORIES.map(
  (category) => category.recipes
).flat();
