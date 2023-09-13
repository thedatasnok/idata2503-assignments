import { useExpenseStore } from '@/store';
import { ExpenseType } from '@/types';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
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
import { Stack, useRouter } from 'expo-router';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ChevronDownIcon,
  DollarSignIcon,
} from 'lucide-react-native';
import { useRef, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddExpenseScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [type, setType] = useState(ExpenseType.FOOD);
  const focusRef = useRef(null);
  const { addExpense } = useExpenseStore();

  const isInvalidTitle = title.trim().length === 0;
  const isInvalidAmount = amount.length === 0;
  const isInvalid = isInvalidTitle || isInvalidAmount;

  const onCancelled = () => {
    router.back();
  };

  const onSaved = () => {
    if (isInvalidTitle) return;

    const parsedAmount = parseFloat(amount);

    if (Number.isNaN(parsedAmount)) return;

    addExpense({
      title,
      amount: parseFloat(amount),
      date,
      type,
    });

    router.push('/');
  };

  const handleDateChange = (date: Date) => {
    setShowDatePicker(false);
    setDate(date);
  };

  const amountChanged = (text: string) => {
    setAmount(
      text.replace(/[^0-9.]/g, '').replace(/(?<=(.*\..*))\./g, '') // remove all but the first dot
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Add expense',
          headerLeft: () => (
            <Button
              size='sm'
              rounded='$full'
              aspectRatio='1/1'
              onPress={onCancelled}
            >
              <ButtonIcon as={ArrowLeftIcon} size='20' />
            </Button>
          ),
        }}
      />

      <Box p='$2'>
        <FormControl isInvalid={isInvalidTitle}>
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
          <FormControlError>
            <FormControlErrorText>Title cannot be blank</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Box flexDirection='row' justifyContent='space-between' gap='$2'>
          <FormControl flex={1} flexBasis={0} isInvalid={isInvalidAmount}>
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
            <FormControlError>
              <FormControlErrorText>
                Amount cannot be blank
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl flex={1} flexBasis='$0'>
            <FormControlLabel mb='$0'>
              <FormControlLabelText>Date</FormControlLabelText>
            </FormControlLabel>
            <Button
              size='md'
              variant='outline'
              action='secondary'
              onPress={() => setShowDatePicker(true)}
              ref={focusRef}
            >
              <ButtonIcon size='sm'>
                <Icon as={CalendarIcon} size='20' />
              </ButtonIcon>
              <ButtonText>{date.toLocaleDateString()}</ButtonText>
            </Button>

            <DateTimePickerModal
              isVisible={showDatePicker}
              date={date}
              display='inline'
              onConfirm={handleDateChange}
              onCancel={() => setShowDatePicker(false)}
              mode='date'
            />
          </FormControl>
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
              {/* @ts-ignore the mr prop works but reports a type error */}
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
          <Button size='sm' onPress={onSaved} disabled={isInvalid}>
            <ButtonText>Save</ButtonText>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddExpenseScreen;
