import { create } from 'zustand';

export interface UserFavoriteState {
  favorites: string[];
}

export interface UserFavoriteActions {
  addFavorite: (recipeId: string) => void;
  removeFavorite: (recipeId: string) => void;
}

export type UserFavoriteStore = UserFavoriteState & UserFavoriteActions;

export const useUserFavoriteStore = create<UserFavoriteStore>((set, get) => ({
  favorites: [],
  addFavorite: (recipe) => {
    set({
      favorites: [...get().favorites, recipe],
    });
  },
  removeFavorite: (recipe) => {
    set({
      favorites: get().favorites.filter((r) => r !== recipe),
    });
  },
}));
