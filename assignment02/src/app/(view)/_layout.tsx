import { Stack } from 'expo-router';
import { getToken } from 'tamagui';

const ViewLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: getToken('$blue10Light'),
        },
        headerTintColor: getToken('$blue1Light'),
        headerTitleStyle: {
          fontSize: getToken('$fontSize.lg'),
          fontWeight: '600',
        },
        animation: 'slide_from_right',
      }}
    />
  );
};

export default ViewLayout;
