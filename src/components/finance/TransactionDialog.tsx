import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  ITransaction, 
  TransactionType,
  ExpenseCategory, 
  IncomeCategory,
  PaymentMethod, 
  RecurringFrequency 
} from '@/interfaces/IFinanceTypes';
import { createTransaction, updateTransaction } from '@/api/financeApi';
import { toast } from 'sonner';

const transactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.number().min(0, 'Amount must be positive'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  source: z.string().optional(),
  paymentMethod: z.string().optional(),
  tags: z.array(z.string()),
  isRecurring: z.boolean(),
  recurringFrequency: z.nativeEnum(RecurringFrequency).optional(),
}).refine((data) => {
  if (data.type === 'income' && !data.source) {
    return false;
  }
  if (data.type === 'expense' && !data.paymentMethod) {
    return false;
  }
  return true;
}, {
  message: 'Source is required for income, Payment method is required for expense',
  path: ['source'],
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: ITransaction | null;
  type: TransactionType;
}

export default function TransactionDialog({
  open,
  onOpenChange,
  transaction,
  type,
}: TransactionDialogProps) {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: type,
      amount: 0,
      category: type === 'income' ? IncomeCategory.OTHER : ExpenseCategory.OTHER,
      description: '',
      date: new Date().toISOString().split('T')[0],
      source: '',
      paymentMethod: PaymentMethod.CASH,
      tags: [],
      isRecurring: false,
    },
  });

  const watchType = form.watch('type');

  useEffect(() => {
    if (transaction) {
      form.reset({
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        description: transaction.description,
        date: new Date(transaction.date).toISOString().split('T')[0],
        source: transaction.source || '',
        paymentMethod: transaction.paymentMethod || PaymentMethod.CASH,
        tags: transaction.tags || [],
        isRecurring: transaction.isRecurring,
        recurringFrequency: transaction.recurringFrequency,
      });
    } else {
      form.reset({
        type: type,
        amount: 0,
        category: type === 'income' ? IncomeCategory.OTHER : ExpenseCategory.OTHER,
        description: '',
        date: new Date().toISOString().split('T')[0],
        source: '',
        paymentMethod: PaymentMethod.CASH,
        tags: [],
        isRecurring: false,
      });
    }
  }, [transaction, type, form]);

  const onSubmit = async (data: TransactionFormValues) => {
    try {
      const transactionData: Omit<ITransaction, '_id'> = {
        type: data.type,
        amount: data.amount,
        category: data.category,
        description: data.description,
        date: new Date(data.date),
        source: data.type === 'income' ? data.source : undefined,
        paymentMethod: data.type === 'expense' ? data.paymentMethod : undefined,
        tags: data.tags,
        isRecurring: data.isRecurring,
        recurringFrequency: data.recurringFrequency,
      };

      if (transaction?._id) {
        await updateTransaction(transaction._id, transactionData);
        toast.success(`${data.type === 'income' ? 'Income' : 'Expense'} updated successfully`);
      } else {
        await createTransaction(transactionData);
        toast.success(`${data.type === 'income' ? 'Income' : 'Expense'} created successfully`);
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(`Failed to save ${data.type}`);
    }
  };

  const categories = watchType === 'income' 
    ? Object.values(IncomeCategory)
    : Object.values(ExpenseCategory);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {transaction 
              ? `Edit ${watchType === 'income' ? 'Income' : 'Expense'}` 
              : `Add New ${watchType === 'income' ? 'Income' : 'Expense'}`}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchType === 'income' ? (
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(PaymentMethod).map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {transaction ? 'Update' : 'Create'}
              </Button>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

