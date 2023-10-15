import { PreferenceTag } from '@/types';
import { create } from 'zustand';

export interface PreferencesState {
  tags: PreferenceTag[];
}

export interface PreferencesActions {
  addPreference: (preference: string) => void;
  removePreference: (preference: string) => void;
}

export type PreferencesStore = PreferencesState & PreferencesActions;

export const usePreferencesStore = create<PreferencesStore>((_set, _get) => ({
  tags: [],
  addPreference: (preference) => {},
  removePreference: (preference) => {},
}));
