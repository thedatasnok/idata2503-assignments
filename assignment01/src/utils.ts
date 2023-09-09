import {
  AppleIcon,
  BriefcaseIcon,
  PlaneIcon,
  SofaIcon,
} from 'lucide-react-native';
import { IconType } from './icons';
import { ExpenseType } from './types';

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
