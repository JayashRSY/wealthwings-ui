"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { TrendingUp, HelpCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/switch";

// Form schema validation
const formSchema = z.object({
  grossIncome: z.number().min(0, "Income cannot be negative"),
  standardDeduction: z.number().default(50000),
  hra: z.number().min(0).optional(),
  deduction80C: z.number().min(0).max(150000, "80C limit is ₹1,50,000"),
  deduction80D: z.number().min(0),
  homeLoanInterest: z.number().min(0),
  otherDeductions: z.number().min(0).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function TaxRegimeCalculator() {
  const [result, setResult] = useState<{
    oldRegime: number;
    newRegime: number;
    difference: number;
    winner: "old" | "new";
  } | null>(null);

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema) as Resolver<FormData>,
    defaultValues: {
      standardDeduction: 50000,
      hra: 0,
      deduction80C: 0,
      deduction80D: 0,
      homeLoanInterest: 0,
      otherDeductions: 0,
    },
  });

  const calculateTax = (income: number, isNewRegime: boolean) => {
    let tax = 0;
    if (isNewRegime) {
      // New Tax Regime Slabs 2023-24
      if (income <= 300000) {
        tax = 0;
      } else if (income <= 600000) {
        tax = (income - 300000) * 0.05;
      } else if (income <= 900000) {
        tax = 15000 + (income - 600000) * 0.1;
      } else if (income <= 1200000) {
        tax = 45000 + (income - 900000) * 0.15;
      } else if (income <= 1500000) {
        tax = 90000 + (income - 1200000) * 0.2;
      } else {
        tax = 150000 + (income - 1500000) * 0.3;
      }
    } else if (income <= 250000) {
      tax = 0;
    } else if (income <= 500000) {
      tax = (income - 250000) * 0.05;
    } else if (income <= 1000000) {
      tax = 12500 + (income - 500000) * 0.2;
    } else {
      tax = 112500 + (income - 1000000) * 0.3;
    }
    return Math.round(tax);
  };

  const onSubmit = (data: FormData) => {
    const totalDeductions =
      data.standardDeduction +
      (data.hra || 0) +
      (data.deduction80C || 0) +
      (data.deduction80D || 0) +
      (data.homeLoanInterest || 0) +
      (data.otherDeductions || 0);

    const oldRegimeTaxableIncome = Math.max(
      0,
      data.grossIncome - totalDeductions
    );
    const newRegimeTaxableIncome = data.grossIncome;

    const oldRegimeTax = calculateTax(oldRegimeTaxableIncome, false);
    const newRegimeTax = calculateTax(newRegimeTaxableIncome, true);
    const difference = oldRegimeTax - newRegimeTax;

    setResult({
      oldRegime: oldRegimeTax,
      newRegime: newRegimeTax,
      difference: Math.abs(difference),
      winner: difference > 0 ? "new" : "old",
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Old vs New Tax Regime Calculator
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Compare both tax regimes to find which one saves you more money
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Income Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="grossIncome">
                    Gross Annual Income (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Total income before any deductions
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="grossIncome"
                    type="number"
                    {...register("grossIncome", { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="standardDeduction">
                      Standard Deduction (₹)
                    </Label>
                    <Switch id="enableStandardDeduction" defaultChecked />
                  </div>
                  <Input
                    id="standardDeduction"
                    type="number"
                    {...register("standardDeduction", { valueAsNumber: true })}
                  />
                </div>

                {/* Add other input fields similarly */}
                <div className="space-y-2">
                  <Label htmlFor="hra">HRA (₹)</Label>
                  <Input
                    id="hra"
                    type="number"
                    {...register("hra", { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deduction80C">80C Deductions (₹)</Label>
                  <Input
                    id="deduction80C"
                    type="number"
                    max={150000}
                    {...register("deduction80C", { valueAsNumber: true })}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Compare Regimes
                </Button>
              </form>
            </CardContent>
          </Card>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Calculation Results</span>
                      <Badge
                        variant={
                          result.winner === "new" ? "default" : "secondary"
                        }
                      >
                        {result.winner === "new"
                          ? "New Regime Better"
                          : "Old Regime Better"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-blue-700">
                          Old Regime Tax
                        </h3>
                        <p className="text-2xl font-bold text-blue-600">
                          ₹{result.oldRegime.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-semibold text-purple-700">
                          New Regime Tax
                        </h3>
                        <p className="text-2xl font-bold text-purple-600">
                          ₹{result.newRegime.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-700">You Save</h3>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{result.difference.toLocaleString()}
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        with {result.winner === "new" ? "New" : "Old"} Regime
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Tax calculation is indicative. Consult a tax advisor for exact
            figures.
          </p>
          <a
            href="https://incometaxindia.gov.in/Pages/tax-slabs.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            View Official Income Tax Slabs
          </a>
        </div>
      </div>
    </div>
  );
}
