export type IncomeFrequency = 
  | 'one-time'
  | 'daily'
  | 'weekly'
  | 'bi-weekly'
  | 'monthly'
  | 'quarterly'
  | 'annually';

export type PaymentMethod = 
  | 'Cash'
  | 'UPI'
  | 'Credit Card'
  | 'Debit Card'
  | 'Net Banking'
  | 'Other';

export type ExpenseCategory = 
  | 'Food & Dining'
  | 'Groceries'
  | 'Shopping'
  | 'Transportation'
  | 'Entertainment'
  | 'Bills & Utilities'
  | 'Health & Fitness'
  | 'Travel'
  | 'Education'
  | 'Personal Care'
  | 'Home'
  | 'Gifts & Donations'
  | 'Investments'
  | 'Other';

export interface Income {
  date: string | number | Date;
  id?: string;
  user_id?: string;
  source_name: string;
  amount: number;
  frequency: IncomeFrequency;
  income_date: string | Date;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Expense {
  date: string | number | Date;
  id?: string;
  user_id?: string;
  category: ExpenseCategory;
  amount: number;
  expense_date: string | Date;
  payment_method: PaymentMethod;
  merchant_name?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}