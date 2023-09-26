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
import { useState } from 'react';

export interface UndoExpenseDeletionToastProps {
  id: string;
  title: string;
  onUndo?: () => void;
}

/**
 * Component for rendering a custom toast for when an expense is deleted.
 * Adds custom styling and an undo button to the toast.
 */
const UndoExpenseDeletionToast: React.FC<UndoExpenseDeletionToastProps> = ({
  id,
  title,
  onUndo,
}) => {
  const [isUndone, setIsUndone] = useState(false);

  const handleUndo = () => {
    setIsUndone(true);
    if (isUndone) return;
    onUndo?.();
  }

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
      <Button size='xs' variant='outline' action='negative' onPress={handleUndo}>
        <ButtonText>Undo</ButtonText>
      </Button>
    </Toast>
  );
};

export default UndoExpenseDeletionToast;
