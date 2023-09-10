import {
  Button,
  ButtonText,
  Icon,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed';
import { CheckIcon } from 'lucide-react-native';

export interface UndoExpenseDeletionToastProps {
  id: string;
  title: string;
  onUndo?: () => void;
}

const UndoExpenseDeletionToast: React.FC<UndoExpenseDeletionToastProps> = ({
  id,
  title,
  onUndo,
}) => {
  return (
    <Toast
      nativeID={id}
      bg='$green100'
      borderColor='$green200'
      borderWidth='$1'
      alignItems='center'
      gap='$1'
    >
      <Icon as={CheckIcon} color='$green500' />
      <VStack>
        <ToastTitle>Deleted expense</ToastTitle>
        <ToastDescription>Expense "{title}" has been deleted</ToastDescription>
      </VStack>
      <Button size='xs' variant='outline' action='negative' onPress={onUndo}>
        <ButtonText>Undo</ButtonText>
      </Button>
    </Toast>
  );
};

export default UndoExpenseDeletionToast;
