import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, DollarSign, Target } from "lucide-react";
import { Link } from "react-router-dom";

const MutualFunds = () => {
  const portfolioStats = [
    {
      id: 1,
      name: "Total Investment",
      value: 250000,
      change: 12.5,
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      id: 2,
      name: "Current Value",
      value: 285000,
      change: 8.2,
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      id: 3,
      name: "Total Returns",
      value: 35000,
      change: 14.0,
      trend: "up",
      icon: Target,
      color: "text-purple-600",
    },
    {
      id: 4,
      name: "XIRR",
      value: 12.8,
      change: -2.1,
      trend: "down",
      icon: BarChart3,
      color: "text-orange-600",
    },
  ];

  const fundCategories = [
    {
      name: "Equity Funds",
      count: 8,
      value: 180000,
      percentage: 63.2,
      color: "bg-blue-500",
    },
    {
      name: "Debt Funds",
      count: 3,
      value: 45000,
      percentage: 15.8,
      color: "bg-green-500",
    },
    {
      name: "Hybrid Funds",
      count: 2,
      value: 35000,
      percentage: 12.3,
      color: "bg-purple-500",
    },
    {
      name: "International Funds",
      count: 1,
      value: 25000,
      percentage: 8.7,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Mutual Funds Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your mutual fund investments and analyze portfolio performance.
        </p>
      </div>

      {/* Portfolio Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioStats.map((stat) => (
          <Card key={stat.id} className="hover:shadow-lg transition-all duration-300 border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">
                  {stat.name === "XIRR" ? `${stat.value}%` : `₹${stat.value.toLocaleString()}`}
                </div>
                <div className="flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.change}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fund Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              Portfolio Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fundCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ₹{category.value.toLocaleString()} ({category.percentage}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full ${category.color} rounded-full transition-all duration-300`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Link to="recommender">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
                  <Target className="mr-2 h-4 w-4" />
                  Fund Recommender
                </Button>
              </Link>
              <Link to="comparisons">
                <Button variant="outline" className="w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Compare Funds
                </Button>
              </Link>
              <Link to="all-funds">
                <Button variant="outline" className="w-full">
                  <PieChart className="mr-2 h-4 w-4" />
                  Browse All Funds
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "2024-01-15", fund: "Axis Bluechip Fund", type: "SIP", amount: 5000 },
              { date: "2024-01-10", fund: "HDFC Mid-Cap Fund", type: "Lump Sum", amount: 25000 },
              { date: "2024-01-05", fund: "ICICI Prudential Balanced Fund", type: "SIP", amount: 3000 },
            ].map((transaction, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                <div>
                  <p className="font-medium text-foreground">{transaction.fund}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">₹{transaction.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{transaction.type}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MutualFunds; 