import axiosInstance from "@/lib/api/axiosInstance";
import { MutualFund } from "@/lib/constants/mutualFundsConstants";

export const recommendFunds = async (preferences: {
  investmentGoal: string;
  investmentHorizon: string;
  riskTolerance: string;
  investmentAmount: number;
  category?: string;
}) => {
  const response = await axiosInstance.post(
    "/mutual-funds/recommend",
    preferences
  );
  return response.data;
};

export const compareFunds = async (fundNames: string[]) => {
  const response = await axiosInstance.post(
    "/mutual-funds/compare",
    { funds: fundNames }
  );
  return response.data;
};

export const getAllFunds = async (filters?: {
  category?: string;
  fundHouse?: string;
  riskLevel?: string;
  minRating?: number;
}) => {
  const response = await axiosInstance.get("/mutual-funds", {
    params: filters,
  });
  return response.data;
};

export const getFundDetails = async (fundId: string) => {
  const response = await axiosInstance.get(`/mutual-funds/${fundId}`);
  return response.data;
};

export const getFundPerformance = async (fundId: string, period: string) => {
  const response = await axiosInstance.get(`/mutual-funds/${fundId}/performance`, {
    params: { period },
  });
  return response.data;
};

export const getFundHoldings = async (fundId: string) => {
  const response = await axiosInstance.get(`/mutual-funds/${fundId}/holdings`);
  return response.data;
};

export const calculateSIPReturns = async (data: {
  fundId: string;
  monthlyAmount: number;
  duration: number;
  expectedReturn: number;
}) => {
  const response = await axiosInstance.post(
    "/mutual-funds/sip-calculator",
    data
  );
  return response.data;
};

export const calculateLumpSumReturns = async (data: {
  fundId: string;
  amount: number;
  duration: number;
  expectedReturn: number;
}) => {
  const response = await axiosInstance.post(
    "/mutual-funds/lumpsum-calculator",
    data
  );
  return response.data;
}; 