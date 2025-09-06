import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import CalculatorsLayout from "../pages/Dashboard/Calculators/CalculatorsLayout";
import CardsLayout from "../pages/Dashboard/Cards/CardsLayout";
import MutualFundsLayout from "../pages/Dashboard/MutualFunds/MutualFundsLayout";
import BlogsLayout from "../pages/Dashboard/Blogs/BlogsLayout";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const FinanceTrackerLayout = lazy(() => import("../pages/Dashboard/FinanceTracker/FinanceTrackerLayout"));
const FinanceTracker = lazy(() => import("../pages/Dashboard/FinanceTracker"));
const Calculators = lazy(() => import("../pages/Dashboard/Calculators"));
const MfCommission = lazy(() => import("../pages/Dashboard/Calculators/MFCommission/index"));
const TaxRegime = lazy(() => import("../pages/Dashboard/Calculators/TaxRegime/index"));
const FloatingInterest = lazy(() => import("../pages/Dashboard/Calculators/FloatingInterest/index"));
const MfOverlap = lazy(() => import("../pages/Dashboard/Calculators/MFOverlap/index"));
const SurrenderValue = lazy(() => import("../pages/Dashboard/Calculators/SurrenderValue/index"));
const RetirementCorpus = lazy(() => import("../pages/Dashboard/Calculators/RetirementCorpus/index"));
const LoanRefinance = lazy(() => import("../pages/Dashboard/Calculators/LoanRefinance/index"));
const InsuranceCommission = lazy(() => import("../pages/Dashboard/Calculators/InsuranceCommission/index"));
const IncreasingSIP = lazy(() => import("../pages/Dashboard/Calculators/IncreasingSIP/index"));
const HRAExemption = lazy(() => import("../pages/Dashboard/Calculators/HRAExemption/index"));
const NPSCalculator = lazy(() => import("../pages/Dashboard/Calculators/NPSCalculator/index"));
const Cards = lazy(() => import("../pages/Dashboard/Cards"));
const CardRecommender = lazy(() => import("../pages/Dashboard/Cards/Recommender/index"));
const StatementUpload = lazy(() => import("../pages/Dashboard/Cards/StatementUpload/index"));
const StatementHistory = lazy(() => import("../pages/Dashboard/Cards/StatementHistory/index"));
const MutualFunds = lazy(() => import("../pages/Dashboard/MutualFunds"));
const FundRecommender = lazy(() => import("../pages/Dashboard/MutualFunds/Recommender/index"));
const FundComparisons = lazy(() => import("../pages/Dashboard/MutualFunds/Comparisons/index"));
const AllFunds = lazy(() => import("../pages/Dashboard/MutualFunds/AllFunds/index"));
const Blogs = lazy(() => import("../pages/Dashboard/Blogs"));
const BlogDetail = lazy(() => import("../pages/Dashboard/Blogs/BlogDetail"));
const BlogEditor = lazy(() => import("../pages/Dashboard/Blogs/BlogEditor"));
const Analytics = lazy(() => import("../pages/Analytics"));
const Services = lazy(() => import("../pages/Services"));

export const appRoutes = [
  { path: "/", element: Home },
  { path: "/about", element: About },
  { path: "/login", element: Login },
  { path: "/register", element: Register },
  {
    element: ProtectedRoute,
    children: [
      { path: "/profile", element: Profile },
    ],
  },
  {
    path: "/dashboard",
    element: DashboardLayout,
    children: [
      { index: true, element: Dashboard },
      {
        path: "finance-tracker",
        element: FinanceTrackerLayout,
        children: [
          { index: true, element: FinanceTracker },
          { path: "*", element: NotFound },
        ],
      },
      {
        path: "calculators",
        element: CalculatorsLayout,
        children: [
          { index: true, element: Calculators },
          { path: "mf-commission", element: MfCommission },
          { path: "tax-regime", element: TaxRegime },
          { path: "floating-interest", element: FloatingInterest },
          { path: "mf-overlap", element: MfOverlap },
          { path: "surrender-value", element: SurrenderValue },
          { path: "retirement-corpus", element: RetirementCorpus },
          { path: "loan-refinance", element: LoanRefinance },
          { path: "insurance-commission", element: InsuranceCommission },
          { path: "increasing-sip", element: IncreasingSIP },
          { path: "hra-exemption", element: HRAExemption },
          { path: "nps-calculator", element: NPSCalculator },
        ],
      },
      {
        path: "cards",
        element: CardsLayout,
        children: [
          { index: true, element: Cards },
          { path: "recommender", element: CardRecommender },
          { path: "statement-upload", element: StatementUpload },
          { path: "statement-history", element: StatementHistory },
          { path: "*", element: NotFound },
        ],
      },
      {
        path: "mutual-funds",
        element: MutualFundsLayout,
        children: [
          { index: true, element: MutualFunds },
          { path: "recommender", element: FundRecommender },
          { path: "comparisons", element: FundComparisons },
          { path: "all-funds", element: AllFunds },
          { path: "*", element: NotFound },
        ],
      },
      {
        path: "blogs",
        element: BlogsLayout,
        children: [
          { index: true, element: Blogs },
          { path: "new", element: BlogEditor },
          { path: "edit/:id", element: BlogEditor },
          { path: ":slug", element: BlogDetail },
          { path: "*", element: NotFound },
        ],
      },
      { path: "analytics", element: Analytics },
      { path: "services", element: Services },
      { path: "*", element: NotFound },
    ],
  },
  { path: "*", element: NotFound },
];