import { Category, Recipe } from './types';

const categoryMap: Record<string, Category> = {
  italian: {
    id: 'italian',
    name: 'Italian',
    recipes: [],
  },
};

export const recipes: Recipe[] = [
  {
    id: '',
    name: '',
    approximateMinutes: 30,
    imageUrls: [],
    categories: [categoryMap.italian],
    ingredients: [],
    steps: [],
  },
];

recipes.forEach((recipe) => {
  recipe.categories.forEach((category) =>
    categoryMap[category.id].recipes.push(recipe)
  );
});

export const categories: Category[] = Object.values(categoryMap);
