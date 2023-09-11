import ExpenseBarChart from '@/components/ExpenseBarChart';
import ExpenseListItem from '@/components/ExpenseListItem';
import UndoExpenseDeletionToast from '@/components/UndoExpenseDeletionToast';
import { useExpenseStore } from '@/store';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  Heading,
  useToast,
} from '@gluestack-ui/themed';
import { Stack, useRouter } from 'expo-router';
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
  const toast = useToast();
  const { expenses, addExpense, removeExpense } = useExpenseStore();

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
        <Box
          bg='$blueGray100'
          borderWidth='$1'
          borderColor='$blueGray200'
          rounded='$md'
        >
          <ExpenseBarChart />
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
