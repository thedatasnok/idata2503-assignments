import { PreferenceTag } from '@/types';
import { create } from 'zustand';

export interface PreferencesState {
  tags: PreferenceTag[];
}

export interface PreferencesActions {
  addPreference: (preference: PreferenceTag) => void;
  removePreference: (preference: PreferenceTag) => void;
}

export type PreferencesStore = PreferencesState & PreferencesActions;

export const usePreferencesStore = create<PreferencesStore>((set, get) => ({
  tags: [],
  addPreference: (preference) => {
    set({
      tags: [...get().tags, preference],
    });
  },
  removePreference: (preference) => {
    set({
      tags: get().tags.filter((p) => p !== preference),
    });
  },
}));
