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
import { IIncome, IncomeCategory, RecurringFrequency } from '@/interfaces/IFinanceTypes';
import { createIncome, updateIncome } from '@/api/financeApi';
import { toast } from 'sonner';

const incomeSchema = z.object({
  amount: z.number().min(0, 'Amount must be positive'),
  category: z.nativeEnum(IncomeCategory),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  source: z.string().min(1, 'Source is required'),
  tags: z.array(z.string()),
  isRecurring: z.boolean(),
  recurringFrequency: z.nativeEnum(RecurringFrequency).optional(),
});

type IncomeFormValues = z.infer<typeof incomeSchema>;

interface IncomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  income: IIncome | null;
}

export default function IncomeDialog({
  open,
  onOpenChange,
  income,
}: IncomeDialogProps) {
  const form = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      amount: 0,
      category: IncomeCategory.OTHER,
      description: '',
      date: new Date().toISOString().split('T')[0],
      source: '',
      tags: [],
      isRecurring: false,
    },
  });

  useEffect(() => {
    if (income) {
      form.reset({
        amount: income.amount,
        category: income.category,
        description: income.description,
        date: new Date(income.date).toISOString().split('T')[0],
        source: income.source,
        tags: income.tags || [],
        isRecurring: income.isRecurring,
        recurringFrequency: income.recurringFrequency,
      });
    } else {
      form.reset({
        amount: 0,
        category: IncomeCategory.OTHER,
        description: '',
        date: new Date().toISOString().split('T')[0],
        source: '',
        tags: [],
        isRecurring: false,
      });
    }
  }, [income, form]);

  const onSubmit = async (data: IncomeFormValues) => {
    try {
      const incomeData: Omit<IIncome, '_id'> = {
        amount: data.amount,
        category: data.category,
        description: data.description,
        date: new Date(data.date),
        source: data.source,
        tags: data.tags,
        isRecurring: data.isRecurring,
        recurringFrequency: data.recurringFrequency,
      };

      if (income?._id) {
        await updateIncome(income._id, incomeData);
        toast.success('Income updated successfully');
      } else {
        await createIncome(incomeData);
        toast.success('Income created successfully');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to save income');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {income ? 'Edit Income' : 'Add New Income'}
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(IncomeCategory).map((category) => (
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

            <FormField
              control={form.control}
              name="isRecurring"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Recurring Income</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('isRecurring') && (
              <FormField
                control={form.control}
                name="recurringFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(RecurringFrequency).map((frequency) => (
                          <SelectItem key={frequency} value={frequency}>
                            {frequency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {income ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 