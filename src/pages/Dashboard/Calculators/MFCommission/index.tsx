'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Download, MessageCircle, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CalculationResult {
  regularPlan: {
    finalCorpus: number;
    totalCommission: number;
    yearlyBreakdown: Array<{
      year: number;
      corpus: number;
      commission: number;
    }>;
  };
  directPlan: {
    finalCorpus: number;
    totalCommission: number;
    yearlyBreakdown: Array<{
      year: number;
      corpus: number;
      commission: number;
    }>;
  };
  potentialSavings: number;
}

export default function MutualFundCommissionCalculator() {
  const [formData, setFormData] = useState({
    initialInvestment: 100000,
    sipAmount: 10000,
    duration: 5,
    expectedReturn: 12,
    planType: 'regular',
    commissionRate: 1,
    additionalCharges: 0,
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  
  // Remove the isDarkMode state as we'll use the theme from next-themes
  
  useEffect(() => {
    calculateResults();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const calculateResults = () => {
    const {
      initialInvestment,
      sipAmount,
      duration,
      expectedReturn,
      commissionRate,
    } = formData;

    // Helper function to calculate lump sum amount
    const calculateLumpSum = (principal: number, rate: number, time: number) => {
      return principal * Math.pow(1 + rate / 100, time);
    };

    // Helper function to calculate SIP amount
    const calculateSIP = (monthly: number, rate: number, months: number) => {
      const monthlyRate = rate / 12 / 100;
      return monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    };

    const regularPlanBreakdown = [];
    const directPlanBreakdown = [];

    // Regular plan calculations (with commission)
    const regularRate = expectedReturn - commissionRate;
    let regularCorpus = 0;
    let regularCommission = 0;

    // Direct plan calculations (without commission)
    const directRate = expectedReturn;
    let directCorpus = 0;

    for (let year = 1; year <= duration; year++) {
      // Calculate for lump sum
      const regularLumpSum = calculateLumpSum(initialInvestment, regularRate, year);
      const directLumpSum = calculateLumpSum(initialInvestment, directRate, year);

      // Calculate for SIP
      const regularSIP = calculateSIP(sipAmount, regularRate, year * 12);
      const directSIP = calculateSIP(sipAmount, directRate, year * 12);

      // Total corpus for each plan
      regularCorpus = regularLumpSum + regularSIP;
      directCorpus = directLumpSum + directSIP;

      // Calculate commission
      const yearlyCommission = (regularCorpus - directCorpus);
      regularCommission += yearlyCommission;

      // Add to yearly breakdown
      regularPlanBreakdown.push({
        year,
        corpus: Math.round(regularCorpus),
        commission: Math.round(yearlyCommission)
      });

      directPlanBreakdown.push({
        year,
        corpus: Math.round(directCorpus),
        commission: 0
      });
    }

    const result: CalculationResult = {
      regularPlan: {
        finalCorpus: Math.round(regularCorpus),
        totalCommission: Math.round(regularCommission),
        yearlyBreakdown: regularPlanBreakdown
      },
      directPlan: {
        finalCorpus: Math.round(directCorpus),
        totalCommission: 0,
        yearlyBreakdown: directPlanBreakdown
      },
      potentialSavings: Math.round(regularCommission)
    };

    setResult(result);
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mutual Fund Commission Calculator
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Compare regular and direct mutual fund plans to see how much you can save
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6 text-primary" />
                Investment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="initialInvestment">
                    Initial Investment (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          The lump sum amount you want to invest initially
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="initialInvestment"
                    type="number"
                    value={formData.initialInvestment}
                    onChange={(e) => setFormData({ ...formData, initialInvestment: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <Label htmlFor="sipAmount">
                    Monthly SIP Amount (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Systematic Investment Plan - Monthly investment amount
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="sipAmount"
                    type="number"
                    value={formData.sipAmount}
                    onChange={(e) => setFormData({ ...formData, sipAmount: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <Label>Investment Duration (Years)</Label>
                  <Slider
                    value={[formData.duration]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) => setFormData({ ...formData, duration: value[0] })}
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.duration} years</span>
                </div>

                <div>
                  <Label>Expected Annual Return (%)</Label>
                  <Slider
                    value={[formData.expectedReturn]}
                    min={1}
                    max={30}
                    step={0.5}
                    onValueChange={(value) => setFormData({ ...formData, expectedReturn: value[0] })}
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.expectedReturn}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Calculation Results</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Results will be displayed here */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <h3 className="font-semibold text-green-700 dark:text-green-400">Direct Plan</h3>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ₹{result?.directPlan.finalCorpus.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                    <h3 className="font-semibold text-red-700 dark:text-red-400">Regular Plan</h3>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      ₹{result?.regularPlan.finalCorpus.toLocaleString() || 0}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400">Potential Savings</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ₹{result?.potentialSavings.toLocaleString() || 0}
                  </p>
                </div>

                {/* Year-wise breakdown table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Direct Plan</TableHead>
                      <TableHead>Regular Plan</TableHead>
                      <TableHead>Difference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result?.regularPlan.yearlyBreakdown.map((item, index) => (
                      <TableRow key={item.year}>
                        <TableCell>{item.year}</TableCell>
                        <TableCell className="text-green-600 dark:text-green-400">
                          ₹{result.directPlan.yearlyBreakdown[index].corpus.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-red-600 dark:text-red-400">
                          ₹{item.corpus.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-blue-600 dark:text-blue-400">
                          ₹{(result.directPlan.yearlyBreakdown[index].corpus - item.corpus).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="flex justify-center gap-4 mt-8">
          <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
            Switch to Direct Plan Now
          </Button>
          <Button variant="outline" className="border-primary text-primary">
            <MessageCircle className="h-4 w-4 mr-2" />
            Talk to an Advisor
          </Button>
        </div>
      </div>
    </div>
  );
}