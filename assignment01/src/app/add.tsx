import { ExpenseType } from '@/types';
import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Icon,
  Input,
  InputField,
  InputIcon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { ChevronDownIcon, DollarSignIcon } from 'lucide-react-native';
import { useState } from 'react';

const AddExpenseScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [_date, _setDate] = useState(new Date());
  const [type, setType] = useState(ExpenseType.FOOD);

  const onCancelled = () => {
    router.back();
  };

  const onSaved = () => {
    // TODO: Save expense to store
  };

  const amountChanged = (text: string) => {
    setAmount(
      text
        .replace(/[^0-9.,]/g, '')
        .replace(/(?<=(.*\..*))\./g, '') // remove all but the first dot
        .replace(/(?<=(.*,.*)),/g, '') // remove all but the first comma
    );
  };

  return (
    <>
      <Box
        bg='$primary500'
        px='$2'
        py='$1'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Heading color='$white'>Add expense</Heading>
      </Box>

      <Box p='$2'>
        <FormControl>
          <FormControlLabel mb='$0'>
            <FormControlLabelText>Title</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              value={title}
              onChangeText={setTitle}
              type='text'
              placeholder='Groceries'
            />
          </Input>
        </FormControl>

        <Box justifyContent='space-between'>
          <FormControl>
            <FormControlLabel mb='$0'>
              <FormControlLabelText>Amount</FormControlLabelText>
            </FormControlLabel>
            <Input gap='$0'>
              <InputIcon>
                <Icon as={DollarSignIcon} size='20' ml='$1' />
              </InputIcon>
              <InputField
                pl='$0'
                type='text'
                value={amount}
                onChangeText={amountChanged}
                keyboardType='decimal-pad'
                placeholder='100'
              />
            </Input>
          </FormControl>

          {/* TODO: Add date input */}
        </Box>

        <FormControl>
          <FormControlLabel mb='$0'>
            <FormControlLabelText>Type</FormControlLabelText>
          </FormControlLabel>
          <Select
            onValueChange={(newValue) => setType(newValue as ExpenseType)}
            defaultValue={type}
          >
            <SelectTrigger variant='outline'>
              <SelectInput />
              {/* @ts-ignore the mr prop works but reports an error*/}
              <SelectIcon size='12' mr='$2'>
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>

            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>

                <SelectItem label='Food' value={ExpenseType.FOOD} />
                <SelectItem label='Travel' value={ExpenseType.TRAVEL} />
                <SelectItem label='Leisure' value={ExpenseType.LEISURE} />
                <SelectItem label='Work' value={ExpenseType.WORK} />
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>

        <Box flexDirection='row' justifyContent='flex-end' mt='$2' gap='$1'>
          <Button
            size='sm'
            variant='outline'
            action='secondary'
            onPress={onCancelled}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button size='sm' onPress={onSaved}>
            <ButtonText>Save</ButtonText>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddExpenseScreen;
