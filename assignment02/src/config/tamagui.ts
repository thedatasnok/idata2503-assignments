import { config } from '@tamagui/config/v2';
import { createTamagui, createTokens } from 'tamagui';

export const tokens = createTokens({
  ...config.tokens,
  fontSize: {
    lg: 20,
  },
});

const appConfig = createTamagui({
  ...config,
  tokens,
});

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
