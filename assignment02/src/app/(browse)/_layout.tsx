import { config } from '@gluestack-ui/themed';
import { Drawer } from 'expo-router/drawer';

const BrowseLayout = () => {
  return (
    <Drawer
      initialRouteName='(meals)'
      defaultStatus='closed'
      screenOptions={{
        headerStyle: {
          backgroundColor: config.theme.tokens.colors.blue500,
        },
        headerTitleStyle: {
          fontSize: config.theme.tokens.fontSizes.lg,
          fontWeight: config.theme.tokens.fontWeights.bold,
        },
        headerTintColor: config.theme.tokens.colors.blue50,
      }}
    >
      <Drawer.Screen name='(meals)' options={{ title: 'Meals' }} />
      <Drawer.Screen name='settings' options={{ title: 'Settings' }} />
    </Drawer>
  );
};

export default BrowseLayout;
