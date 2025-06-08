import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { IIncome, IIncomesResponse } from '@/interfaces/IFinanceTypes';
import { getIncomes, deleteIncome } from '@/api/financeApi';
import { formatCurrency, formatDate } from '@/lib/utils';
import { toast } from 'sonner';

interface IncomeListProps {
  onEdit: (income: IIncome) => void;
}

export default function IncomeList({ onEdit }: IncomeListProps) {
  const [incomes, setIncomes] = useState<IIncome[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState<IIncome | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });

  const fetchIncomes = async (page: number = 1) => {
    try {
      const response: IIncomesResponse = await getIncomes({ page });
      if (response.success && response.data) {
        setIncomes(response.data.incomes);
        setPagination(response.data.pagination);
      } else {
        toast.error(response.message || 'Failed to fetch incomes');
        setIncomes([]);
      }
    } catch (error) {
      toast.error('Failed to fetch incomes');
      setIncomes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleDelete = async (income: IIncome) => {
    setIncomeToDelete(income);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!incomeToDelete?._id) return;

    try {
      const response = await deleteIncome(incomeToDelete._id);
      if (response.success) {
        setIncomes((prevIncomes) => 
          prevIncomes.filter((i) => i._id !== incomeToDelete._id)
        );
        toast.success(response.message || 'Income deleted successfully');
      } else {
        toast.error(response.message || 'Failed to delete income');
      }
    } catch (error) {
      toast.error('Failed to delete income');
    } finally {
      setDeleteDialogOpen(false);
      setIncomeToDelete(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incomes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No incomes found
                </TableCell>
              </TableRow>
            ) : (
              incomes.map((income) => (
                <TableRow key={income._id}>
                  <TableCell>{formatDate(income.date)}</TableCell>
                  <TableCell>{income.category}</TableCell>
                  <TableCell>{income.description}</TableCell>
                  <TableCell>{formatCurrency(income.amount)}</TableCell>
                  <TableCell>{income.source}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(income)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(income)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination.pages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchIncomes(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchIncomes(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
          >
            Next
          </Button>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              income entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 