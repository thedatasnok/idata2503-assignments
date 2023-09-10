import ExpenseListItem from '@/components/ExpenseListItem';
import { Expense, ExpenseType } from '@/types';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  Heading,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
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

const HomeScreen = () => {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      title: 'Groceries',
      amount: 100.29,
      date: new Date(),
      type: ExpenseType.FOOD,
    },
    {
      id: '2',
      title: 'Groceries',
      amount: 100.29,
      date: new Date(),
      type: ExpenseType.LEISURE,
    },
    {
      id: '3',
      title: 'Groceries',
      amount: 100.29,
      date: new Date(),
      type: ExpenseType.TRAVEL,
    },
    {
      id: '4',
      title: 'Groceries',
      amount: 100.29,
      date: new Date(),
      type: ExpenseType.WORK,
    },
  ]);

  const onAddPressed = () => {
    router.push('/add');
  };

  const onExpenseDeleted = (id: string) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);

    LayoutAnimation.configureNext(LAYOUT_ANIMATION_CONFIG);
  };

  return (
    <>
      {/* Header */}
      <Box
        bg='$primary500'
        px='$2'
        py='$1'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Heading color='$white'>Expense tracker</Heading>

        <Button
          size='sm'
          rounded='$full'
          aspectRatio='1/1'
          onPress={onAddPressed}
        >
          <ButtonIcon as={AddIcon} size='md' />
        </Button>
      </Box>

      {/* Content */}
      <Box flex={1} p='$2'>
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
