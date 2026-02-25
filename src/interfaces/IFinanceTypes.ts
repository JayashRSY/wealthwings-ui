export enum ExpenseCategory {
  FOOD_DINING = 'Food & Dining',
  TRANSPORTATION = 'Transportation',
  HOUSING = 'Housing',
  UTILITIES = 'Utilities',
  ENTERTAINMENT = 'Entertainment',
  SHOPPING = 'Shopping',
  HEALTHCARE = 'Healthcare',
  EDUCATION = 'Education',
  TRAVEL = 'Travel',
  PERSONAL_CARE = 'Personal Care',
  GIFTS_DONATIONS = 'Gifts & Donations',
  INVESTMENTS = 'Investments',
  OTHER = 'Other',
}

export enum PaymentMethod {
  CASH = 'Cash',
  CREDIT_CARD = 'Credit Card',
  DEBIT_CARD = 'Debit Card',
  BANK_TRANSFER = 'Bank Transfer',
  UPI = 'UPI',
  OTHER = 'Other',
}

export enum RecurringFrequency {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
}

export enum IncomeCategory {
  SALARY = 'Salary',
  FREELANCE = 'Freelance',
  BUSINESS = 'Business',
  INVESTMENTS = 'Investments',
  RENTAL = 'Rental',
  GIFTS = 'Gifts',
  REFUNDS = 'Refunds',
  OTHER = 'Other',
}

export interface IExpense {
  _id?: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
  paymentMethod: PaymentMethod;
  tags: string[];
  isRecurring: boolean;
  recurringFrequency?: RecurringFrequency;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPagination {
  total: number;
  page: number;
  pages: number;
}

export interface IExpensesResponse {
  success: boolean;
  message: string;
  data: {
  expenses: IExpense[];
    pagination: IPagination;
  };
}

export interface IIncome {
  _id?: string;
  amount: number;
  category: IncomeCategory;
  description: string;
  date: Date;
  source: string;
  tags: string[];
  isRecurring: boolean;
  recurringFrequency?: RecurringFrequency;
  createdAt?: Date;
  updatedAt?: Date;
} 

export interface IIncomesResponse {
  success: boolean;
  message: string;
  data: {
  incomes: IIncome[];
  pagination: IPagination;
  }
}

// Unified Transaction Types
export type TransactionType = 'income' | 'expense';

export interface ITransaction {
  _id?: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: Date;
  source?: string; // For income
  paymentMethod?: string; // For expense
  tags: string[];
  isRecurring: boolean;
  recurringFrequency?: RecurringFrequency;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransactionsResponse {
  success: boolean;
  message: string;
  data: {
    transactions: ITransaction[];
    pagination: IPagination;
  };
}
