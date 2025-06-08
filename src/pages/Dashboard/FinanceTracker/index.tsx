import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ExpenseList from '@/components/finance/ExpenseList';
import { IExpense, IIncome } from '@/interfaces/IFinanceTypes';
import IncomeList from '@/components/finance/IncomeList';
import ExpenseDialog from '@/components/finance/ExpenseDialog';
import IncomeDialog from '@/components/finance/IncomeDialog';

const FinanceTracker = () => {
  const [activeTab, setActiveTab] = useState('expenses');
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [selectedIncome, setSelectedIncome] = useState<IIncome | null>(null);

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setIsExpenseDialogOpen(true);
  };

  const handleEditExpense = (expense: IExpense) => {
    setSelectedExpense(expense);
    setIsExpenseDialogOpen(true);
  };

  const handleAddIncome = () => {
    setSelectedIncome(null);
    setIsIncomeDialogOpen(true);
  };

  const handleEditIncome = (income: IIncome) => {
    setSelectedIncome(income);
    setIsIncomeDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Finance Tracker</h1>
        <Button
          onClick={activeTab === 'expenses' ? handleAddExpense : handleAddIncome}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add {activeTab === 'expenses' ? 'Expense' : 'Income'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Track Your Finances</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
            </TabsList>
            <TabsContent value="expenses">
              <ExpenseList onEdit={handleEditExpense} />
            </TabsContent>
            <TabsContent value="income">
              <IncomeList onEdit={handleEditIncome} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ExpenseDialog
        open={isExpenseDialogOpen}
        onOpenChange={setIsExpenseDialogOpen}
        expense={selectedExpense}
      />

      <IncomeDialog
        open={isIncomeDialogOpen}
        onOpenChange={setIsIncomeDialogOpen}
        income={selectedIncome}
      />
    </div>
  );
} 

export default FinanceTracker;