export const enum ExpenseType {
  FOOD,
  TRAVEL,
  LEISURE,
  WORK,
}

export interface Expense {
  id: string;
  title: string;
  type: ExpenseType;
  amount: number;
  date: Date;
}
