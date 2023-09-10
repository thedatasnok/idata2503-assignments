import { Expense, ExpenseType } from '@/types';
import { randomUUID } from 'expo-crypto';
import { create } from 'zustand';

export interface ExpenseState {
  expenses: Expense[];
}

export interface ExpenseActions {
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  removeExpense: (id: string) => Expense;
}

export type ExpenseStore = ExpenseState & ExpenseActions;

// TODO: Add middleware for persisting the state in device storage
export const useExpenseStore = create<ExpenseStore>((set, get) => ({
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
    const deletedExpense = get().expenses.find((expense) => expense.id === id);
    if (!deletedExpense) throw new Error('Could not find expense to delete');

    const expenses = get().expenses.filter((expense) => expense.id !== id);
    set({ expenses });

    return deletedExpense;
  },
}));
