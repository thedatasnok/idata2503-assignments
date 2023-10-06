import tamaguiConfig from '@/config/tamagui';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';
import { useColorScheme } from 'react-native';
import { TamaguiProvider, Text, Theme } from 'tamagui';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Theme name={colorScheme}>
          <ThemeProvider
            value={colorScheme === 'light' ? DefaultTheme : DarkTheme}
          >
            <Stack
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />
          </ThemeProvider>
        </Theme>
      </Suspense>

      <StatusBar />
    </TamaguiProvider>
  );
}
