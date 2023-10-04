import { config } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';

const ViewLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: config.theme.tokens.colors.blue500,
        },
        headerTintColor: config.theme.tokens.colors.blue50,
        headerTitleStyle: {
          fontSize: config.theme.tokens.fontSizes.lg,
          fontWeight: config.theme.tokens.fontWeights.bold,
        },
        animation: 'slide_from_right',
      }}
    />
  );
};

export default ViewLayout;
