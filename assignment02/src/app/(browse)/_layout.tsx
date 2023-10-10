import { getToken } from '@/config/gluestack';
import { config } from '@gluestack-ui/config';
import { Drawer } from 'expo-router/drawer';

const BrowseLayout = () => {
  return (
    <Drawer
      initialRouteName='(meals)'
      defaultStatus='closed'
      screenOptions={{
        headerStyle: {
          backgroundColor: getToken('colors', 'primary500'),
        },
        headerTitleStyle: {
          fontSize: config.tokens.fontSizes.lg,
          fontWeight: '600',
        },
        headerTintColor: getToken('colors', 'primary50'),
      }}
    >
      <Drawer.Screen name='(meals)' options={{ title: 'Meals' }} />
      <Drawer.Screen name='settings' options={{ title: 'Settings' }} />
    </Drawer>
  );
};

export default BrowseLayout;
