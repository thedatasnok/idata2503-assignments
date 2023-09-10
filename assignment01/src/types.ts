export const enum ExpenseType {
  FOOD = 'Food',
  TRAVEL = 'Travel',
  LEISURE = 'Leisure',
  WORK = 'Work',
}

export interface Expense {
  id: string;
  title: string;
  type: ExpenseType;
  amount: number;
  date: Date;
}
