export interface Category {
  id: string;
  name: string;
  recipes: Recipe[];
  colors: [string, string];
}

/**
 * Represents a recipe to cook a meal.
 */
export interface Recipe {
  id: string;
  name: string;
  affordability: Affordability;
  complexity: Complexity;
  duration: number;
  imageUrls: string[];
  categories: Category[];
  tags: Set<PreferenceTag>;
  ingredients: string[];
  steps: string[];
}

export const enum Affordability {
  AFFORDABLE = 'affordable',
  PRICEY = 'pricey',
  LUXURIOUS = 'luxurious',
}

export const enum Complexity {
  SIMPLE = 'simple',
  CHALLENGING = 'challenging',
  HARD = 'hard',
}

export const enum PreferenceTag {
  LACTOSE_FREE = 'lactose-free',
  GLUTEN_FREE = 'gluten-free',
  VEGAN = 'vegan',
  VEGETARIAN = 'vegetarian',
}
