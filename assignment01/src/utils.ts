import {
  AppleIcon,
  BriefcaseIcon,
  PlaneIcon,
  SofaIcon,
} from 'lucide-react-native';
import { IconType } from './icons';
import { ExpenseType } from './types';

/**
 * Gets the icon for a given expense type.
 *
 * @param type the expense type to get an icon for
 *
 * @returns the icon for the given expense type
 */
export const getExpenseTypeIcon = (type: ExpenseType): IconType => {
  switch (type) {
    case ExpenseType.FOOD:
      return AppleIcon;
    case ExpenseType.TRAVEL:
      return PlaneIcon;
    case ExpenseType.LEISURE:
      return SofaIcon;
    case ExpenseType.WORK:
      return BriefcaseIcon;
  }
};
