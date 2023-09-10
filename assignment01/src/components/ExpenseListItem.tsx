import { ExpenseType } from '@/types';
import { getExpenseTypeIcon } from '@/utils';
import {
  Box,
  HStack,
  Heading,
  Icon,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { TrashIcon } from 'lucide-react-native';
import { Swipeable } from 'react-native-gesture-handler';

export interface ExpenseListItemProps {
  title: string;
  type: ExpenseType;
  amount: number;
  date: Date;
  onPress?: () => void;
  onDelete?: () => void;
}

const ExpenseListItem: React.FC<ExpenseListItemProps> = ({
  title,
  type,
  amount,
  date,
  onPress,
  onDelete,
}) => {
  const icon = getExpenseTypeIcon(type);
  const handleSwipeableOpened = (direction: 'left' | 'right') => {
    if (direction === 'right') onDelete?.();
  };

  return (
    <Swipeable
      friction={2}
      rightThreshold={36}
      onSwipeableOpen={handleSwipeableOpened}
      renderRightActions={(_progressValue, _dragValue, _swipeable) => (
        <Box
          bgColor='$red500'
          alignItems='flex-end'
          justifyContent='center'
          px='$2'
          w='$full'
          my='$1'
          rounded='$md'
        >
          <Icon as={TrashIcon} color='white' />
        </Box>
      )}
    >
      <Pressable
        onPress={onPress}
        alignItems='flex-end'
        flexDirection='row'
        justifyContent='space-between'
        bg='$blueGray100'
        my='$1'
        py='$1'
        px='$2'
        rounded='$md'
        borderColor='$blueGray200'
        borderWidth='$1'
      >
        <VStack flex={1}>
          <Heading size='md'>{title}</Heading>
          <Text size='sm'>${amount}</Text>
        </VStack>

        <HStack alignItems='center' gap='$1'>
          <Icon as={icon} size='16' />
          <Text size='sm' fontWeight='$medium'>
            {date.toLocaleDateString()}
          </Text>
        </HStack>
      </Pressable>
    </Swipeable>
  );
};

export default ExpenseListItem;
