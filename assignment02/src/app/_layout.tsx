import { Box, GluestackUIProvider, config } from '@gluestack-ui/themed';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <Box
        h='$full'
        w='$full'
        sx={{
          _dark: {
            bgColor: '$gray900',
          },
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </Box>

      <StatusBar />
    </GluestackUIProvider>
  );
}
