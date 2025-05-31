import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import StatementUpload from "./StatementUpload";

const Cards = () => {
  const cards = [
    {
      id: 1,
      name: "Premium Credit Card",
      number: "**** **** **** 4589",
      balance: 45000,
      limit: 100000,
      type: "credit",
      trend: "up",
      percentage: 12,
    },
    {
      id: 2,
      name: "Rewards Card",
      number: "**** **** **** 1234",
      balance: 25000,
      limit: 50000,
      type: "credit",
      trend: "down",
      percentage: 5,
    },
    {
      id: 3,
      name: "Business Card",
      number: "**** **** **** 7890",
      balance: 75000,
      limit: 200000,
      type: "credit",
      trend: "up",
      percentage: 8,
    },
  ];

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cards Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your credit cards and track spending limits in one place.
        </p>
      </div>

      {/* Statement Upload */}
      <StatementUpload />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="hover:shadow-lg transition-all duration-300 border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.name}
              </CardTitle>
              <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-xl font-mono text-foreground">{card.number}</div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="text-2xl font-bold text-foreground">₹{card.balance.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {card.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ${card.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {card.percentage}%
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Credit Limit</span>
                    <span>₹{card.limit.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(card.balance / card.limit) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Card Button */}
      <div className="flex justify-center mt-8">
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
          <Wallet className="mr-2 h-4 w-4" />
          Add New Card
        </Button>
      </div>
    </div>
  );
};

export default Cards;
