import TabBarIcon from '@/components/TabBarIcon';
import { TabOptions } from '@/utils';
import { Box, Icon, MenuIcon, Pressable, config } from '@gluestack-ui/themed';
import { Tabs } from 'expo-router';
import { HeartIcon, LayoutDashboardIcon } from 'lucide-react-native';
import React, { ComponentProps } from 'react';

const SCREEN_OPTIONS: ComponentProps<typeof Tabs>['screenOptions'] = {
  headerStyle: {
    backgroundColor: config.theme.tokens.colors.blue500,
  },
  headerTintColor: config.theme.tokens.colors.blue50,
  headerTitleStyle: {
    fontSize: config.theme.tokens.fontSizes.lg,
    fontWeight: config.theme.tokens.fontWeights.bold,
  },
  headerLeft: () => (
    <Pressable p='$2'>
      <Icon as={MenuIcon} color='$black' />
    </Pressable>
  ),
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
