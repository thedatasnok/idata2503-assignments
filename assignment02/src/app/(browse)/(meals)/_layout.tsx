import TabBarIcon from '@/components/TabBarIcon';
import { TabOptions } from '@/utils';
import { Heart, LayoutDashboard } from 'lucide-react-native';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { Box } from '@gluestack-ui/themed';

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
    <Box flex={1}>
      <Tabs screenOptions={SCREEN_OPTIONS}>
        {TABS.map(({ path, options }) => (
          <Tabs.Screen key={path} name={path} options={options} />
        ))}
      </Tabs>
    </Box>
  );
};

export default BrowseLayout;
