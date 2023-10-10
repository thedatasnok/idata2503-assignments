import { config } from '@/config/gluestack';
import { GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </Suspense>

      <StatusBar />
    </GluestackUIProvider>
  );
}
