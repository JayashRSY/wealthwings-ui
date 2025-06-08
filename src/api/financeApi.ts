import { IExpense, IExpensesResponse, IIncome, IIncomesResponse } from "@/interfaces/IFinanceTypes";
import axiosInstance from "@/lib/api/axiosInstance";

// Expense APIs
export const getExpenses = async () => {
  const response = await axiosInstance.get<IExpensesResponse>('/expenses');
  return response.data;
};

export const createExpense = async (expense: Omit<IExpense, '_id'>) => {
  const response = await axiosInstance.post<IExpense>('/expenses', expense);
  return response.data;
};

export const updateExpense = async (id: string, expense: Partial<IExpense>) => {
  const response = await axiosInstance.put<IExpense>(`/expenses/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id: string) => {
  const response = await axiosInstance.delete(`/expenses/${id}`);
  return response.data;
};

// Income APIs
export const getIncomes = async () => {
  const response = await axiosInstance.get<IIncomesResponse>('/incomes');
  return response.data;
};

export const createIncome = async (income: Omit<IIncome, '_id'>) => {
  const response = await axiosInstance.post<IIncome>('/incomes', income);
  return response.data;
};

export const updateIncome = async (id: string, income: Partial<IIncome>) => {
  const response = await axiosInstance.put<IIncome>(`/incomes/${id}`, income);
  return response.data;
};

export const deleteIncome = async (id: string) => {
  const response = await axiosInstance.delete(`/incomes/${id}`);
  return response.data;
}; 