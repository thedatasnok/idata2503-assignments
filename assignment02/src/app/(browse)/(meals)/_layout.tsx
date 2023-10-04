import TabBarIcon from '@/components/TabBarIcon';
import { TabOptions } from '@/utils';
import { Box } from '@gluestack-ui/themed';
import { Tabs } from 'expo-router';
import { HeartIcon, LayoutDashboardIcon } from 'lucide-react-native';
import React, { ComponentProps } from 'react';

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
      tabBarIcon: (props) => (
        <TabBarIcon {...props} icon={LayoutDashboardIcon} />
      ),
    },
  },
  {
    path: 'favorites',
    options: {
      title: 'Favorites',
      tabBarIcon: (props) => <TabBarIcon {...props} icon={HeartIcon} />,
    },
  },
];

const BrowseLayout = () => {
  return (
    <Box h='$full' w='$full'>
      <Tabs screenOptions={SCREEN_OPTIONS}>
        {TABS.map(({ path, options }) => (
          <Tabs.Screen key={path} name={path} options={options} />
        ))}
      </Tabs>
    </Box>
  );
};

export default BrowseLayout;
