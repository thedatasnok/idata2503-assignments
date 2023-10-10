import { Stack } from 'expo-router';
import { getToken } from '@/config/gluestack';

const ViewLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: getToken('colors', 'primary500'),
        },
        headerTintColor: getToken('colors', 'primary50'),
        headerTitleStyle: {
          fontSize: getToken('fontSizes', 'lg'),
          fontWeight: '600',
        },
        animation: 'slide_from_right',
      }}
    />
  );
};

export default ViewLayout;
