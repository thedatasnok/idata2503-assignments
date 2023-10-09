import { usePreferencesStore } from './store/preferences';
import { Category, Recipe } from './types';

/**
 * Hook for finding recipes by category id, matching a users allergies or preferences.
 *
 * @param categoryId the id of the category to find recipes within
 *
 * @returns an object containing the category and the recipes
 */
export const useRecipes = (categoryId: string) => {
  // TODO: Find allRecipes from category id
  const category: Category = {
    id: 'italian',
    name: 'Italian',
    recipes: [
      {
        id: 'margharita-pizza',
        ingredients: ['tomato', 'cheese', 'dough'],
        name: 'Margharita Pizza',
        steps: [
          '1. Put the dough in the oven',
          '2. Put the tomato on the dough',
          '3. Put the cheese on the tomato',
        ],
        approximateMinutes: 30,
        categories: [],
        imageUrls: [],
        allergies: [],
      },
    ],
  };

  const allRecipes: Recipe[] = category.recipes;
  const allergies = usePreferencesStore((state) => state.allergies);

  const filteredRecipes = allRecipes.filter((recipe) => {
    return !recipe.allergies.some((allergy) => allergies.includes(allergy));
  });

  return { category, recipes: filteredRecipes };
};

/**
 * Hook for finding a given recipe by its id.
 *
 * @param recipeId the id of the recipe
 *
 * @returns an objecct containing the recipe
 */
export const useRecipe = (recipeId: string): Recipe => {
  // TODO: Wire up to the same data as useRecipes uses

  return {
    id: 'margharita-pizza',
    ingredients: ['tomato', 'cheese', 'dough'],
    name: 'Margharita Pizza',
    steps: [],
    approximateMinutes: 30,
    categories: [],
    imageUrls: [],
    allergies: [],
  };
};
