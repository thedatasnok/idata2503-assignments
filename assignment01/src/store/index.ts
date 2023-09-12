import { Expense, ExpenseType } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ExpenseState {
  expenses: Expense[];
}

export interface ExpenseActions {
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  removeExpense: (id: string) => Expense;
}

export type ExpenseStore = ExpenseState & ExpenseActions;

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [
        {
          id: '1',
          title: 'Groceries',
          amount: 70.43,
          date: new Date(),
          type: ExpenseType.FOOD,
        },
        {
          id: '2',
          title: 'Movie',
          amount: 6.5,
          date: new Date(),
          type: ExpenseType.LEISURE,
        },
        {
          id: '3',
          title: 'Bus ticket',
          amount: 50.29,
          date: new Date(),
          type: ExpenseType.TRAVEL,
        },
        {
          id: '4',
          title: 'Lunch',
          amount: 5.29,
          date: new Date(),
          type: ExpenseType.WORK,
        },
      ],
      addExpense: (expense: Omit<Expense, 'id'>) => {
        set({
          expenses: [
            ...get().expenses,
            {
              ...expense,
              id: randomUUID(),
            },
          ],
        });
      },
      removeExpense: (id: string) => {
        const deletedExpense = get().expenses.find(
          (expense) => expense.id === id
        );
        if (!deletedExpense)
          throw new Error('Could not find expense to delete');

        const expenses = get().expenses.filter((expense) => expense.id !== id);
        set({ expenses });

        return deletedExpense;
      },
    }),
    {
      name: 'expense-storage',
      storage: {
        getItem: async (name) => {
          const item = await AsyncStorage.getItem(name);
          if (!item) return null;

          const { state } = JSON.parse(item);
          const expenses: Expense[] = state.expenses.map((expense: any) => ({
            ...expense,
            date: new Date(expense.date),
          }));

          return {
            state: {
              ...state,
              expenses,
            },
          };
        },
        setItem: async (name, value) => {
          const item = JSON.stringify(value);
          await AsyncStorage.setItem(name, item);
        },
        removeItem: (name) => AsyncStorage.removeItem(name),
      },
    }
  )
);
