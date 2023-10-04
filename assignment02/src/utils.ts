import { Stack, Tabs } from 'expo-router';
import { AccessibilityIcon } from 'lucide-react-native';
import { ComponentProps } from 'react';

export type IconType = typeof AccessibilityIcon;

// utility types for navigation types
export type StackOptions = ComponentProps<typeof Stack.Screen>['options'];
export type TabOptions = ComponentProps<typeof Tabs.Screen>['options'];
