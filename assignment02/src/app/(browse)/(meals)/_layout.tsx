import TabBarIcon from '@/components/TabBarIcon';
import { TabOptions } from '@/utils';
import { Heart, LayoutDashboard } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { Stack } from 'tamagui';

const SCREEN_OPTIONS: ComponentProps<typeof Tabs>['screenOptions'] = {
  headerShown: false,
};

type TabDefinition = {
  path: string;
  options: TabOptions;
};

const TABS: TabDefinition[] = [
  {
    path: 'index',
    options: {
      title: 'Categories',
      tabBarIcon: (props) => <TabBarIcon {...props} icon={LayoutDashboard} />,
    },
  },
  {
    path: 'favorites',
    options: {
      title: 'Favorites',
      tabBarIcon: (props) => <TabBarIcon {...props} icon={Heart} />,
    },
  },
];

const BrowseLayout = () => {
  return (
    <Stack flex={1}>
      <Tabs screenOptions={SCREEN_OPTIONS}>
        {TABS.map(({ path, options }) => (
          <Tabs.Screen key={path} name={path} options={options} />
        ))}
      </Tabs>
    </Stack>
  );
};

export default BrowseLayout;
