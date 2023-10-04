import { IconType } from '@/utils';
import { Icon } from '@gluestack-ui/themed';

export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  icon: IconType;
}

/**
 * Component for rendering the tab icons in the browse layout.
 *
 * @param props
 *
 * @returns
 */
const TabBarIcon: React.FC<TabBarIconProps> = ({ color, size, icon }) => {
  return <Icon as={icon} color={color} size={size} />;
};

export default TabBarIcon;
