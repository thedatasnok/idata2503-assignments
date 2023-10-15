import { categories, recipes } from './data';
import { usePreferencesStore } from './store/preferences';
import { Recipe } from './types';

/**
 * Hook for finding recipes by category id, matching a users allergies or preferences.
 *
 * @param categoryId the id of the category to find recipes within
 *
 * @returns an object containing the category and the recipes
 */
export const useRecipes = (categoryId: string) => {
  const category = categories.find((category) => category.id === categoryId);

  if (!category) return { category: null, recipes: [] };

  const allRecipes: Recipe[] = category.recipes;
  const tags = usePreferencesStore((state) => state.tags);

  const filteredRecipes = allRecipes.filter((recipe) => {
    if (tags.length === 0) return true;

    const matches = tags.reduce((acc, tag) => {
      if (recipe.tags.has(tag)) return acc + 1;
      return acc;
    }, 0);

    return matches === tags.length;
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
export const useRecipe = (recipeId: string): Recipe | undefined => {
  const recipe = recipes.find((recipe) => recipe.id === recipeId);

  return recipe;
};
