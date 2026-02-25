import {
  IExpense,
  IExpensesResponse,
  IIncome,
  IIncomesResponse,
  ITransaction,
  ITransactionsResponse,
  TransactionType
} from "@/interfaces/IFinanceTypes";
import axiosInstance from "@/lib/api/axiosInstance";

// ============================================
// NEW UNIFIED TRANSACTION API
// ============================================

export const getTransactions = async (params?: {
  page?: number;
  limit?: number;
  type?: TransactionType;
  category?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const response = await axiosInstance.get<ITransactionsResponse>('/transactions', { params });
  return response.data;
};

export const createTransaction = async (transaction: Omit<ITransaction, '_id'>) => {
  const response = await axiosInstance.post<{ success: boolean; message: string; data: ITransaction }>('/transactions', transaction);
  return response.data;
};

export const updateTransaction = async (id: string, transaction: Partial<ITransaction>) => {
  const response = await axiosInstance.put<{ success: boolean; message: string; data: ITransaction }>(`/transactions/${id}`, transaction);
  return response.data;
};

export const deleteTransaction = async (id: string) => {
  const response = await axiosInstance.delete(`/transactions/${id}`);
  return response.data;
};

export const getTransactionStats = async (params?: {
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
}) => {
  const response = await axiosInstance.get('/transactions/stats', { params });
  return response.data;
};

// ============================================
// LEGACY APIs (Backward Compatibility)
// These wrap the new transaction API
// ============================================

// Expense APIs
export const getExpenses = async (params?: { page?: number }) => {
  const response = await getTransactions({ ...params, type: 'expense' });
  return {
    ...response,
    data: {
      expenses: response.data.transactions,
      pagination: response.data.pagination
    }
  } as IExpensesResponse;
};

export const createExpense = async (expense: Omit<IExpense, '_id'>) => {
  const transaction: Omit<ITransaction, '_id'> = {
    type: 'expense',
    amount: expense.amount,
    category: expense.category,
    description: expense.description,
    date: expense.date,
    paymentMethod: expense.paymentMethod,
    tags: expense.tags,
    isRecurring: expense.isRecurring,
    recurringFrequency: expense.recurringFrequency,
  };
  const response = await createTransaction(transaction);
  return response.data;
};

export const updateExpense = async (id: string, expense: Partial<IExpense>) => {
  const transaction: Partial<ITransaction> = {
    ...expense,
    type: 'expense',
  };
  const response = await updateTransaction(id, transaction);
  return response.data;
};

export const deleteExpense = async (id: string) => {
  return await deleteTransaction(id);
};

// Income APIs
export const getIncomes = async (params?: { page?: number }) => {
  const response = await getTransactions({ ...params, type: 'income' });
  return {
    ...response,
    data: {
      incomes: response.data.transactions,
      pagination: response.data.pagination
    }
  } as IIncomesResponse;
};

export const createIncome = async (income: Omit<IIncome, '_id'>) => {
  const transaction: Omit<ITransaction, '_id'> = {
    type: 'income',
    amount: income.amount,
    category: income.category,
    description: income.description,
    date: income.date,
    source: income.source,
    tags: income.tags,
    isRecurring: income.isRecurring,
    recurringFrequency: income.recurringFrequency,
  };
  const response = await createTransaction(transaction);
  return response.data;
};

export const updateIncome = async (id: string, income: Partial<IIncome>) => {
  const transaction: Partial<ITransaction> = {
    ...income,
    type: 'income',
  };
  const response = await updateTransaction(id, transaction);
  return response.data;
};

export const deleteIncome = async (id: string) => {
  return await deleteTransaction(id);
};