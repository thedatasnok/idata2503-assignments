import { categories, recipes } from './data';
import { useUserFavoriteStore } from './store/favorites';
import { usePreferencesStore } from './store/preferences';
import { Category, Recipe } from './types';

type UseCategories = () => { categories?: Category[] };

/**
 * Hook for finding all categories.
 *
 * @returns an object containing all categories
 */
export const useCategories: UseCategories = () => {
  return { categories };
};

type UseRecipes = (categoryId: string) => {
  category?: Category;
  recipes: Recipe[];
};

/**
 * Hook for finding recipes by category id, matching a users allergies or preferences.
 *
 * @param categoryId the id of the category to find recipes within
 *
 * @returns an object containing the category and the recipes
 */
export const useRecipes: UseRecipes = (categoryId) => {
  const category = categories.find((category) => category.id === categoryId);

  if (!category) return { category: undefined, recipes: [] };

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

type UseRecipe = (recipeId: string) => Recipe | undefined;

/**
 * Hook for finding a given recipe by its id.
 *
 * @param recipeId the id of the recipe
 *
 * @returns an object containing the recipe
 */
export const useRecipe: UseRecipe = (recipeId) => {
  const recipe = recipes.find((recipe) => recipe.id === recipeId);

  return recipe;
};

type UseFavorites = () => {
  recipes?: Recipe[];
};

/**
 * Hook for finding all recipes that are marked as favorites.
 *
 * @returns an object containing all favorite recipes
 */
export const useFavorites: UseFavorites = () => {
  const favorites = useUserFavoriteStore((state) => state.favorites);

  const favoriteRecipes = recipes.filter((recipe) => {
    return favorites.includes(recipe.id);
  });

  return { recipes: favoriteRecipes };
};

type UseFavorited = (recipeId: string) => {
  isFavorited: boolean;
  toggleFavorited: () => void;
};

/**
 * Hook for managing the favorited state of a recipe.
 *
 * @param recipeId the id of the recipe to check
 *
 * @returns an object containing the favorited state and a function to toggle it
 */
export const useFavorited: UseFavorited = (recipeId) => {
  const favorites = useUserFavoriteStore((state) => state.favorites);
  const favoriteStore = useUserFavoriteStore();

  const isFavorited = favorites.includes(recipeId);

  const toggleFavorited = () => {
    if (isFavorited) {
      favoriteStore.removeFavorite(recipeId);
    } else {
      favoriteStore.addFavorite(recipeId);
    }
  };

  return { isFavorited, toggleFavorited };
};
