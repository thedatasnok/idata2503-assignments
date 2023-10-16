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
  AFFORDABLE = 'Affordable',
  PRICEY = 'Pricey',
  LUXURIOUS = 'Luxurious',
}

export const enum Complexity {
  SIMPLE = 'Simple',
  CHALLENGING = 'Challenging',
  HARD = 'Hard',
}

export const enum PreferenceTag {
  LACTOSE_FREE = 'Lactose-free',
  GLUTEN_FREE = 'Gluten-free',
  VEGAN = 'Vegan',
  VEGETARIAN = 'Vegetarian',
}
