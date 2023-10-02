import { Recipe } from '@/types';
import { create } from 'zustand';

export interface UserFavoriteState {
  favorites: Recipe[];
}

export interface UserFavoriteActions {
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (recipe: Recipe) => void;
}

export type UserFavoriteStore = UserFavoriteState & UserFavoriteActions;

export const useUserFavoriteStore = create<UserFavoriteStore>((set, get) => ({
  favorites: [],
  addFavorite: (recipe) => {},
  removeFavorite: (recipe) => {},
}));
