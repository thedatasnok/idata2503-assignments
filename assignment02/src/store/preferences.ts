import { create } from 'zustand';

export interface PreferencesState {
  allergies: string[];
}

export interface PreferencesActions {
  addAllergy: (allergy: string) => void;
  removeAllergy: (allergy: string) => void;
}

export type PreferencesStore = PreferencesState & PreferencesActions;

export const usePreferencesStore = create<PreferencesStore>((_set, _get) => ({
  allergies: [],
  addAllergy: (allergy) => {},
  removeAllergy: (allergy) => {},
}));
