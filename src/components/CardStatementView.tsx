import React from "react";

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

interface CardStatementViewProps {
  data: CardStatementData;
}

const CardStatementView: React.FC<CardStatementViewProps> = ({ data }) => {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl shadow-xl bg-card p-0 overflow-hidden">
      {/* Header */}
      <div className="bg-primary/10 dark:bg-primary/20 px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center text-2xl font-bold shadow">
            💳
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">{data.card_holder_name}</div>
            <div className="text-sm text-muted-foreground">Card: •••• {data.card_number_last4}</div>
          </div>
        </div>
        <div className="flex flex-col md:items-end gap-1">
          <div className="text-xs text-muted-foreground">Statement Period</div>
          <div className="font-medium text-foreground">{data.statement_period.from} - {data.statement_period.to}</div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 py-4 bg-muted/50 dark:bg-muted/30">
        <div className="flex flex-col items-start">
          <span className="text-xs text-muted-foreground">Total Due</span>
          <span className="font-bold text-lg text-destructive">{data.total_due}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs text-muted-foreground">Minimum Due</span>
          <span className="font-semibold text-lg">{data.minimum_due}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs text-muted-foreground">Due Date</span>
          <span className="font-semibold text-lg">{data.due_date}</span>
        </div>
        {data.total_spent && (
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">Total Spent</span>
            <span className="font-semibold text-lg">{data.total_spent}</span>
          </div>
        )}
        {!data.total_spent && <div />}
      </div>

      {/* Rewards */}
      {(data.reward_points_earned !== null && data.reward_points_earned !== undefined) ||
        (data.reward_points_redeemed !== null && data.reward_points_redeemed !== undefined) ? (
        <div className="flex gap-8 px-8 py-3 bg-accent/30 dark:bg-accent/20">
          {data.reward_points_earned !== null && data.reward_points_earned !== undefined && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-yellow-500">⭐</span>
              <span className="text-muted-foreground">Points Earned:</span>
              <span className="font-semibold text-foreground">{data.reward_points_earned}</span>
            </div>
          )}
          {data.reward_points_redeemed !== null && data.reward_points_redeemed !== undefined && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">🎁</span>
              <span className="text-muted-foreground">Points Redeemed:</span>
              <span className="font-semibold text-foreground">{data.reward_points_redeemed}</span>
            </div>
          )}
        </div>
      ) : null}

      {/* Transactions */}
      <div className="px-4 md:px-8 py-6">
        <h3 className="text-lg font-semibold mb-3 text-primary">Transactions</h3>
        <div className="overflow-x-auto rounded-lg bg-background">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/60 dark:bg-muted/40">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((txn, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-card" : "bg-muted/30 dark:bg-muted/10"}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-foreground">{txn.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-foreground">{txn.description}</td>
                  <td className="px-4 py-2 whitespace-nowrap font-semibold text-sm text-right">{txn.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Breakdown */}
      {data.category_breakdown && (
        <div className="px-8 pb-8">
          <h4 className="text-base font-semibold mb-2 text-primary">Category Breakdown</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(data.category_breakdown).map(([category, value]) => (
              <li key={category} className="flex justify-between items-center bg-muted/60 dark:bg-muted/30 rounded px-3 py-2">
                <span className="text-foreground">{category}</span>
                <span className="font-semibold text-primary">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CardStatementView; 