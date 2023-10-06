import { Drawer } from 'expo-router/drawer';
import { getToken } from 'tamagui';

const BrowseLayout = () => {
  return (
    <Drawer
      initialRouteName='(meals)'
      defaultStatus='closed'
      screenOptions={{
        headerStyle: {
          backgroundColor: getToken('$blue10Light'),
        },
        headerTitleStyle: {
          fontSize: getToken('$fontSize.lg'),
          fontWeight: '600',
        },
        headerTintColor: getToken('$blue1Light'),
      }}
    >
      <Drawer.Screen name='(meals)' options={{ title: 'Meals' }} />
      <Drawer.Screen name='settings' options={{ title: 'Settings' }} />
    </Drawer>
  );
};

export default BrowseLayout;
