import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  TrendingUp,
  Percent,
  LineChart,
  Shield,
  Umbrella,
  RefreshCcw,
  FileSpreadsheet,
  ArrowUpRight,
  Building2,
  Building,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

const calculators = [
  {
    title: "Mutual Fund Commission Calculator",
    description: "Calculate and analyze mutual fund commissions and charges",
    icon: Calculator,
    href: "/dashboard/calculators/mf-commission",
    isNew: true,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Tax Regime Calculator",
    description: "Compare old vs new tax regime benefits",
    icon: TrendingUp,
    href: "/dashboard/calculators/tax-regime",
    isUpdated: true,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Floating Interest Rate Calculator",
    description: "Calculate EMIs with floating interest rates",
    icon: Percent,
    href: "/dashboard/calculators/floating-interest",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    title: "Mutual Fund Overlap Calculator",
    description: "Find portfolio overlap between mutual funds",
    icon: LineChart,
    href: "/dashboard/calculators/mf-overlap",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100"
  },
  {
    title: "Insurance Surrender Value Calculator",
    description: "Calculate insurance policy surrender value",
    icon: Shield,
    href: "/dashboard/calculators/surrender-value",
    color: "text-red-600",
    bgColor: "bg-red-100"
  },
  {
    title: "Retirement Corpus Calculator",
    description: "Plan your retirement corpus requirement",
    icon: Umbrella,
    href: "/dashboard/calculators/retirement-corpus",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  {
    title: "Loan Refinance Calculator",
    description: "Compare and analyze loan refinancing options",
    icon: RefreshCcw,
    href: "/dashboard/calculators/loan-refinance",
    color: "text-teal-600",
    bgColor: "bg-teal-100"
  },
  {
    title: "Insurance Commission Analyser",
    description: "Analyze insurance policy commission structure",
    icon: FileSpreadsheet,
    href: "/dashboard/calculators/insurance-commission",
    color: "text-cyan-600",
    bgColor: "bg-cyan-100"
  },
  {
    title: "Increasing SIP Calculator",
    description: "Calculate returns with step-up SIP investments",
    icon: ArrowUpRight,
    href: "/dashboard/calculators/increasing-sip",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100"
  },
  {
    title: "HRA Exemption Calculator",
    description: "Calculate your HRA tax exemption amount",
    icon: Building2,
    href: "/dashboard/calculators/hra-exemption",
    color: "text-rose-600",
    bgColor: "bg-rose-100"
  },
  {
    title: "NPS Calculator",
    description: "Calculate returns on NPS investments",
    icon: Building,
    href: "/dashboard/calculators/nps-calculator",
    color: "text-sky-600",
    bgColor: "bg-sky-100"
  }
];

export default function CalculatorsPage() {
  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-background to-background/80 min-h-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Financial Calculators
        </h1>
        <p className="text-muted-foreground">
          Comprehensive suite of calculators to help you make informed financial decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calculator) => (
          <Link to={calculator.href} key={calculator.title}>
            <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm h-full">
              <CardHeader className="flex flex-row items-start space-y-0 pb-2">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    {calculator.title}
                    {calculator.isNew && (
                      <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                    {calculator.isUpdated && (
                      <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full">
                        Updated
                      </span>
                    )}
                  </CardTitle>
                </div>
                <div className={`p-2 rounded-lg ${calculator.bgColor}`}>
                  <calculator.icon className={`h-5 w-5 ${calculator.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{calculator.description}</p>
                <Button 
                  variant="ghost" 
                  className={`mt-4 w-full justify-between ${calculator.color} hover:${calculator.bgColor}`}
                >
                  Calculate Now
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}