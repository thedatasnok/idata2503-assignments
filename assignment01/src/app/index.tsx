import ExpenseBarChart, {
  ExpenseSumByType,
} from '@/components/ExpenseBarChart';
import ExpenseListItem from '@/components/ExpenseListItem';
import UndoExpenseDeletionToast from '@/components/UndoExpenseDeletionToast';
import { useExpenseStore } from '@/store';
import { ExpenseType } from '@/types';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  Heading,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectInput,
  SelectIcon,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  useToast,
} from '@gluestack-ui/themed';
import dayjs from 'dayjs';
import { Stack, useRouter } from 'expo-router';
import { ChevronDownIcon } from 'lucide-react-native';
import { Satellite } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, LayoutAnimation, LayoutAnimationConfig } from 'react-native';

const LAYOUT_ANIMATION_CONFIG: LayoutAnimationConfig = {
  duration: 200,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 200,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

const enum TimePeriod {
  ALL = 'All',
  THIS_WEEK = 'This week',
  THIS_MONTH = 'This month',
  THIS_YEAR = 'This year',
}

const comparePeriod = (date: Date, period: TimePeriod) => {
  switch (period) {
    case TimePeriod.ALL:
      return true;
    case TimePeriod.THIS_WEEK:
      return dayjs().isSame(date, 'week');
    case TimePeriod.THIS_MONTH:
      return dayjs().isSame(date, 'month');
    case TimePeriod.THIS_YEAR:
      return dayjs().isSame(date, 'year');
  }
};

const HomeScreen = () => {
  const router = useRouter();
  const toast = useToast();
  const { addExpense, removeExpense } = useExpenseStore();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(
    TimePeriod.THIS_WEEK
  );

  const expenses = useExpenseStore((state) =>
    state.expenses.filter((expense) => comparePeriod(expense.date, timePeriod))
  );

  const expenseSumByType = useExpenseStore<ExpenseSumByType[]>((state) => {
    const periodExpenses = state.expenses.filter((expense) =>
      comparePeriod(expense.date, timePeriod)
    );

    const sumByType = {
      [ExpenseType.FOOD]: 0,
      [ExpenseType.LEISURE]: 0,
      [ExpenseType.TRAVEL]: 0,
      [ExpenseType.WORK]: 0,
    };

    periodExpenses.forEach((expense) => {
      sumByType[expense.type] += expense.amount;
    });

    return Object.entries(sumByType).map(([type, amount]) => ({
      x: type as ExpenseType,
      y: amount,
    }));
  });

  const onAddPressed = () => {
    router.push('/add');
  };

  const onExpenseDeleted = (id: string) => {
    const deletedExpense = removeExpense(id);

    LayoutAnimation.configureNext(LAYOUT_ANIMATION_CONFIG);

    toast.show({
      duration: 20_000,
      id: deletedExpense?.id,
      render: () => (
        <UndoExpenseDeletionToast
          key={deletedExpense?.id}
          id={deletedExpense.id}
          title={deletedExpense?.title}
          onUndo={() => {
            addExpense(deletedExpense);
            toast.close(deletedExpense?.id);
          }}
        />
      ),
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerRight: () => (
            <Button
              size='sm'
              rounded='$full'
              aspectRatio='1/1'
              onPress={onAddPressed}
            >
              <ButtonIcon as={AddIcon} size='md' />
            </Button>
          ),
        }}
      />

      {/* Content */}
      <Box flex={1} p='$2'>
        <Select
          onValueChange={(newPeriod) => setTimePeriod(newPeriod as TimePeriod)}
          defaultValue={timePeriod}
          mb='$2'
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

              <SelectItem label='All' value={TimePeriod.ALL} />
              <SelectItem label='This week' value={TimePeriod.THIS_WEEK} />
              <SelectItem label='This month' value={TimePeriod.THIS_MONTH} />
              <SelectItem label='This year' value={TimePeriod.THIS_YEAR} />
            </SelectContent>
          </SelectPortal>
        </Select>

        <Box
          bg='$blueGray100'
          borderWidth='$1'
          borderColor='$blueGray200'
          rounded='$md'
        >
          <ExpenseBarChart data={expenseSumByType} />
        </Box>

        <Heading size='sm'>Expenses</Heading>

        <FlatList
          data={expenses}
          keyExtractor={(expense) => expense.id}
          renderItem={({ item: expense }) => (
            <ExpenseListItem
              key={expense.id}
              title={expense.title}
              type={expense.type}
              amount={expense.amount}
              date={expense.date}
              onDelete={() => onExpenseDeleted(expense.id)}
            />
          )}
        />
      </Box>
    </>
  );
};

export default HomeScreen;
