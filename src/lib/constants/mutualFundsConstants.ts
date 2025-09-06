// Define the MutualFund type
export interface MutualFund {
  id: string;
  name: string;
  fundHouse: string;
  category: string;
  subCategory: string;
  nav: number;
  navDate: string;
  minInvestment: number;
  expenseRatio: number;
  riskLevel: "Low" | "Moderate" | "High" | "Very High";
  rating: number;
  returns: {
    "1Y": number;
    "3Y": number;
    "5Y": number;
    sinceInception: number;
  };
  aum: number;
  description: string;
  imageUrl: string;
}

// Fund Categories
export const FUND_CATEGORIES = [
  "Equity",
  "Debt",
  "Hybrid",
  "Solution Oriented",
  "International",
  "Index",
  "ETF",
  "Fund of Funds",
];

// Equity Sub Categories
export const EQUITY_SUB_CATEGORIES = [
  "Large Cap",
  "Mid Cap",
  "Small Cap",
  "Multi Cap",
  "Large & Mid Cap",
  "Contra",
  "Dividend Yield",
  "Value",
  "Growth",
  "Sectoral",
  "Thematic",
];

// Debt Sub Categories
export const DEBT_SUB_CATEGORIES = [
  "Liquid",
  "Ultra Short Duration",
  "Low Duration",
  "Money Market",
  "Short Duration",
  "Medium Duration",
  "Medium to Long Duration",
  "Long Duration",
  "Corporate Bond",
  "Banking and PSU",
  "Gilt",
  "Floater",
];

// Hybrid Sub Categories
export const HYBRID_SUB_CATEGORIES = [
  "Conservative Hybrid",
  "Balanced Hybrid",
  "Aggressive Hybrid",
  "Dynamic Asset Allocation",
  "Equity Savings",
  "Arbitrage",
  "Multi Asset Allocation",
];

// Risk Levels
export const RISK_LEVELS = [
  { value: "Low", label: "Low Risk", color: "text-green-600" },
  { value: "Moderate", label: "Moderate Risk", color: "text-yellow-600" },
  { value: "High", label: "High Risk", color: "text-orange-600" },
  { value: "Very High", label: "Very High Risk", color: "text-red-600" },
];

// Investment Goals
export const INVESTMENT_GOALS = [
  "Retirement Planning",
  "Child Education",
  "House Purchase",
  "Emergency Fund",
  "Tax Saving",
  "Wealth Creation",
  "Regular Income",
  "Short Term Goals",
];

// Investment Horizons
export const INVESTMENT_HORIZONS = [
  { value: "1-3", label: "1-3 Years", risk: "Low" },
  { value: "3-5", label: "3-5 Years", risk: "Moderate" },
  { value: "5-10", label: "5-10 Years", risk: "High" },
  { value: "10+", label: "10+ Years", risk: "Very High" },
];

// Sample Mutual Funds Data
export const MUTUAL_FUNDS: MutualFund[] = [
  {
    id: "axis-bluechip-fund",
    name: "Axis Bluechip Fund",
    fundHouse: "Axis Mutual Fund",
    category: "Equity",
    subCategory: "Large Cap",
    nav: 45.67,
    navDate: "2024-01-15",
    minInvestment: 500,
    expenseRatio: 1.75,
    riskLevel: "High",
    rating: 4,
    returns: {
      "1Y": 18.5,
      "3Y": 15.2,
      "5Y": 12.8,
      sinceInception: 14.2,
    },
    aum: 45000,
    description: "A large-cap equity fund that invests in blue-chip companies with strong fundamentals and growth potential.",
    imageUrl: "https://example.com/axis-bluechip.png",
  },
  {
    id: "hdfc-midcap-fund",
    name: "HDFC Mid-Cap Opportunities Fund",
    fundHouse: "HDFC Mutual Fund",
    category: "Equity",
    subCategory: "Mid Cap",
    nav: 78.92,
    navDate: "2024-01-15",
    minInvestment: 500,
    expenseRatio: 1.85,
    riskLevel: "Very High",
    rating: 4,
    returns: {
      "1Y": 25.3,
      "3Y": 18.7,
      "5Y": 16.4,
      sinceInception: 17.8,
    },
    aum: 32000,
    description: "A mid-cap equity fund that focuses on companies with high growth potential in the mid-cap segment.",
    imageUrl: "https://example.com/hdfc-midcap.png",
  },
  {
    id: "icici-balanced-fund",
    name: "ICICI Prudential Balanced Advantage Fund",
    fundHouse: "ICICI Prudential Mutual Fund",
    category: "Hybrid",
    subCategory: "Dynamic Asset Allocation",
    nav: 34.56,
    navDate: "2024-01-15",
    minInvestment: 500,
    expenseRatio: 1.65,
    riskLevel: "Moderate",
    rating: 4,
    returns: {
      "1Y": 12.8,
      "3Y": 11.2,
      "5Y": 10.5,
      sinceInception: 11.8,
    },
    aum: 28000,
    description: "A dynamic asset allocation fund that automatically adjusts equity and debt allocation based on market conditions.",
    imageUrl: "https://example.com/icici-balanced.png",
  },
  {
    id: "sbi-liquid-fund",
    name: "SBI Liquid Fund",
    fundHouse: "SBI Mutual Fund",
    category: "Debt",
    subCategory: "Liquid",
    nav: 12.34,
    navDate: "2024-01-15",
    minInvestment: 500,
    expenseRatio: 0.25,
    riskLevel: "Low",
    rating: 4,
    returns: {
      "1Y": 6.2,
      "3Y": 5.8,
      "5Y": 5.5,
      sinceInception: 6.1,
    },
    aum: 15000,
    description: "A liquid fund that invests in short-term money market instruments with high liquidity and low risk.",
    imageUrl: "https://example.com/sbi-liquid.png",
  },
  {
    id: "kotak-emerging-equity",
    name: "Kotak Emerging Equity Fund",
    fundHouse: "Kotak Mutual Fund",
    category: "Equity",
    subCategory: "Small Cap",
    nav: 56.78,
    navDate: "2024-01-15",
    minInvestment: 500,
    expenseRatio: 1.95,
    riskLevel: "Very High",
    rating: 3,
    returns: {
      "1Y": 32.1,
      "3Y": 22.5,
      "5Y": 19.8,
      sinceInception: 21.2,
    },
    aum: 18000,
    description: "A small-cap equity fund that invests in emerging companies with high growth potential.",
    imageUrl: "https://example.com/kotak-emerging.png",
  },
  {
    id: "aditya-birla-corporate-bond",
    name: "Aditya Birla Sun Life Corporate Bond Fund",
    fundHouse: "Aditya Birla Sun Life Mutual Fund",
    category: "Debt",
    subCategory: "Corporate Bond",
    nav: 23.45,
    navDate: "2024-01-15",
    minInvestment: 500,
    expenseRatio: 0.85,
    riskLevel: "Moderate",
    rating: 4,
    returns: {
      "1Y": 8.5,
      "3Y": 7.8,
      "5Y": 7.2,
      sinceInception: 7.9,
    },
    aum: 22000,
    description: "A corporate bond fund that invests in high-quality corporate debt instruments.",
    imageUrl: "https://example.com/aditya-birla-corporate.png",
  },
  {
    id: "mirae-asset-tax-saver",
    name: "Mirae Asset Tax Saver Fund",
    fundHouse: "Mirae Asset Mutual Fund",
    category: "Equity",
    subCategory: "ELSS",
    nav: 67.89,
    navDate: "2024-01-15",
    minInvestment: 500,
    expenseRatio: 1.55,
    riskLevel: "High",
    rating: 4,
    returns: {
      "1Y": 20.3,
      "3Y": 16.8,
      "5Y": 14.2,
      sinceInception: 15.6,
    },
    aum: 12000,
    description: "An ELSS fund that provides tax benefits under Section 80C with a 3-year lock-in period.",
    imageUrl: "https://example.com/mirae-tax-saver.png",
  },
  {
    id: "nippon-india-small-cap",
    name: "Nippon India Small Cap Fund",
    fundHouse: "Nippon India Mutual Fund",
    category: "Equity",
    subCategory: "Small Cap",
    nav: 89.12,
    navDate: "2024-01-15",
    minInvestment: 500,
    expenseRatio: 1.75,
    riskLevel: "Very High",
    rating: 3,
    returns: {
      "1Y": 28.7,
      "3Y": 20.1,
      "5Y": 17.9,
      sinceInception: 19.3,
    },
    aum: 25000,
    description: "A small-cap fund that invests in companies with market capitalization below ₹500 crore.",
    imageUrl: "https://example.com/nippon-small-cap.png",
  },
];

// Fund Houses
export const FUND_HOUSES = [
  "Axis Mutual Fund",
  "HDFC Mutual Fund",
  "ICICI Prudential Mutual Fund",
  "SBI Mutual Fund",
  "Kotak Mutual Fund",
  "Aditya Birla Sun Life Mutual Fund",
  "Mirae Asset Mutual Fund",
  "Nippon India Mutual Fund",
  "UTI Mutual Fund",
  "Franklin Templeton Mutual Fund",
  "DSP Mutual Fund",
  "Tata Mutual Fund",
  "L&T Mutual Fund",
  "IDFC Mutual Fund",
  "Canara Robeco Mutual Fund",
];

// Investment Amounts
export const INVESTMENT_AMOUNTS = [
  { value: 500, label: "₹500" },
  { value: 1000, label: "₹1,000" },
  { value: 2500, label: "₹2,500" },
  { value: 5000, label: "₹5,000" },
  { value: 10000, label: "₹10,000" },
  { value: 25000, label: "₹25,000" },
  { value: 50000, label: "₹50,000" },
  { value: 100000, label: "₹1,00,000" },
]; 