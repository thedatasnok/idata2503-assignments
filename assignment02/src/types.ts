export interface Category {
  id: string;
  name: string;
  recipes: Recipe[];
}

/**
 * Represents a recipe to cook a meal.
 */
export interface Recipe {
  id: string;
  name: string;
  approximateMinutes: number;
  imageUrls: string[];
  categories: Category[];
  allergies: string[];
  ingredients: string[];
  steps: string[];
}
