import React, { useEffect, useState } from "react";
import { getCardStatements } from "@/api/cardApi";
import CardStatementView from "../../../../components/CardStatementView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatementPeriod {
  from: string;
  to: string;
}

interface Transaction {
  date: string;
  description: string;
  amount: string;
}

interface CardStatementData {
  card_holder_name: string;
  card_number_last4: string;
  statement_period: StatementPeriod;
  total_due: string;
  minimum_due: string;
  due_date: string;
  transactions: Transaction[];
  reward_points_earned?: number | null;
  reward_points_redeemed?: number | null;
  total_spent?: string | null;
  category_breakdown?: Record<string, string> | null;
}

const StatementHistory: React.FC = () => {
  const [statements, setStatements] = useState<CardStatementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchStatements = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCardStatements();
        setStatements(data?.data || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch statements.");
      } finally {
        setLoading(false);
      }
    };
    fetchStatements();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-2 md:px-0">
      <Card className="mb-8 bg-transparent shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Statement History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <div className="text-muted-foreground">Loading statements...</div>}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {!loading && !error && statements.length === 0 && (
            <div className="text-muted-foreground">No statements found.</div>
          )}
          <div className="space-y-8">
            {statements.map((statement, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-card shadow-sm overflow-hidden transition-all duration-200"
              >
                {/* Summary Row */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 bg-muted/40 dark:bg-muted/20">
                  <div className="flex flex-wrap gap-6 items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-primary text-xl">💳</span>
                      <span className="font-semibold text-foreground">{statement.card_holder_name}</span>
                      <span className="text-muted-foreground text-sm">•••• {statement.card_number_last4}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Period</span>
                      <span className="font-medium text-foreground">{statement.statement_period.from} - {statement.statement_period.to}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Total Due</span>
                      <span className="font-bold text-destructive">{statement.total_due}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Due Date</span>
                      <span className="font-medium text-foreground">{statement.due_date}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full px-4 py-2 text-primary hover:bg-primary/10 border-none shadow-none"
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                  >
                    {expandedIndex === idx ? "Hide Details" : "View Details"}
                  </Button>
                </div>
                {/* Details */}
                <div
                  className={`transition-all duration-300 ${expandedIndex === idx ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-background`}
                >
                  {expandedIndex === idx && (
                    <div className="p-4 md:p-8">
                      <CardStatementView data={statement} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatementHistory;
