import { Box, GluestackUIProvider, config } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
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
            headerStyle: {
              backgroundColor: config.theme.tokens.colors.primary500,
            },
            headerTintColor: config.theme.tokens.colors.white,
            headerTitleStyle: {
              fontSize: config.theme.tokens.fontSizes.lg,
              fontWeight: config.theme.tokens.fontWeights.bold,
            },
            animation: 'slide_from_right',
          }}
        />
      </Box>

      <StatusBar />
    </GluestackUIProvider>
  );
}
