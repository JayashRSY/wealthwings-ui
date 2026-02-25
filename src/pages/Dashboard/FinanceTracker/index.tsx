import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ITransaction, TransactionType } from '@/interfaces/IFinanceTypes';
import TransactionList from '@/components/finance/TransactionList';
import TransactionDialog from '@/components/finance/TransactionDialog';

const FinanceTracker = () => {
  const [activeTab, setActiveTab] = useState<TransactionType>('expense');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAdd = () => {
    setSelectedTransaction(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setSelectedTransaction(null);
      // Trigger refresh of the list
      setRefreshTrigger(prev => prev + 1);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Finance Tracker</h1>
        <Button
          onClick={handleAdd}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add {activeTab === 'expense' ? 'Expense' : 'Income'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Track Your Finances</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TransactionType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="expense">Expenses</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="expense">
              <TransactionList
                onEdit={handleEdit}
                type="expense"
                refreshTrigger={refreshTrigger}
              />
            </TabsContent>
            <TabsContent value="income">
              <TransactionList
                onEdit={handleEdit}
                type="income"
                refreshTrigger={refreshTrigger}
              />
            </TabsContent>
            <TabsContent value="all">
              <TransactionList
                onEdit={handleEdit}
                refreshTrigger={refreshTrigger}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <TransactionDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        transaction={selectedTransaction}
        type={activeTab === 'all' ? 'expense' : activeTab}
      />
    </div>
  );
}

export default FinanceTracker;