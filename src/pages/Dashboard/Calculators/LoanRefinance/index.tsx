'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, HelpCircle, Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RefinanceResult {
  oldLoanEMI: number;
  newLoanEMI: number;
  monthlySavings: number;
  totalInterestOld: number;
  totalInterestNew: number;
  totalSavings: number;
  breakEvenMonths: number;
  comparison: Array<{
    month: number;
    oldLoanBalance: number;
    newLoanBalance: number;
    savings: number;
  }>;
}

export default function LoanRefinanceCalculator() {
  const [formData, setFormData] = useState({
    currentLoanBalance: 2000000,
    currentInterestRate: 8.5,
    remainingTenure: 180, // months
    newInterestRate: 7.5,
    newTenure: 180, // months
    processingFee: 1, // percentage
    preclosureCharges: 0,
  });

  const [result, setResult] = useState<RefinanceResult | null>(null);

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 12 / 100;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1)
    );
  };

  const calculateRefinance = () => {
    const {
      currentLoanBalance,
      currentInterestRate,
      remainingTenure,
      newInterestRate,
      newTenure,
      processingFee,
      preclosureCharges,
    } = formData;

    // Calculate EMIs
    const oldEMI = calculateEMI(currentLoanBalance, currentInterestRate, remainingTenure);
    const newEMI = calculateEMI(
      currentLoanBalance + (currentLoanBalance * processingFee) / 100 + preclosureCharges,
      newInterestRate,
      newTenure
    );

    // Calculate total interest payments
    const totalInterestOld = oldEMI * remainingTenure - currentLoanBalance;
    const totalInterestNew = newEMI * newTenure - currentLoanBalance;

    // Calculate monthly savings
    const monthlySavings = oldEMI - newEMI;

    // Calculate break-even point (considering processing fees and charges)
    const totalCosts = (currentLoanBalance * processingFee) / 100 + preclosureCharges;
    const breakEvenMonths = Math.ceil(totalCosts / monthlySavings);

    // Generate comparison data
    const comparison = [];
    let oldBalance = currentLoanBalance;
    let newBalance = currentLoanBalance + (currentLoanBalance * processingFee) / 100 + preclosureCharges;
    let totalSavings = -totalCosts;

    for (let month = 1; month <= Math.min(remainingTenure, newTenure); month++) {
      const oldInterest = (oldBalance * currentInterestRate) / 12 / 100;
      const newInterest = (newBalance * newInterestRate) / 12 / 100;
      
      oldBalance = oldBalance + oldInterest - oldEMI;
      newBalance = newBalance + newInterest - newEMI;
      totalSavings += oldEMI - newEMI;

      comparison.push({
        month,
        oldLoanBalance: Math.max(0, Math.round(oldBalance)),
        newLoanBalance: Math.max(0, Math.round(newBalance)),
        savings: Math.round(totalSavings),
      });
    }

    setResult({
      oldLoanEMI: Math.round(oldEMI),
      newLoanEMI: Math.round(newEMI),
      monthlySavings: Math.round(monthlySavings),
      totalInterestOld: Math.round(totalInterestOld),
      totalInterestNew: Math.round(totalInterestNew),
      totalSavings: Math.round(totalInterestNew - totalInterestOld),
      breakEvenMonths,
      comparison,
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loan Refinance Calculator
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Compare your existing loan with refinancing options to make an informed decision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-6 w-6 text-blue-600" />
                Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentLoanBalance">
                    Current Loan Balance (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Outstanding principal amount of your current loan
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="currentLoanBalance"
                    type="number"
                    value={formData.currentLoanBalance}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentLoanBalance: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label>Current Interest Rate (%)</Label>
                  <Slider
                    value={[formData.currentInterestRate]}
                    min={4}
                    max={15}
                    step={0.1}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, currentInterestRate: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.currentInterestRate}%</span>
                </div>

                <div>
                  <Label>Remaining Tenure (Months)</Label>
                  <Slider
                    value={[formData.remainingTenure]}
                    min={12}
                    max={360}
                    step={12}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, remainingTenure: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.remainingTenure} months</span>
                </div>

                <div>
                  <Label>New Interest Rate (%)</Label>
                  <Slider
                    value={[formData.newInterestRate]}
                    min={4}
                    max={15}
                    step={0.1}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, newInterestRate: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.newInterestRate}%</span>
                </div>

                <div>
                  <Label>Processing Fee (%)</Label>
                  <Slider
                    value={[formData.processingFee]}
                    min={0}
                    max={3}
                    step={0.1}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, processingFee: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.processingFee}%</span>
                </div>

                <div>
                  <Label htmlFor="preclosureCharges">Preclosure Charges (₹)</Label>
                  <Input
                    id="preclosureCharges"
                    type="number"
                    value={formData.preclosureCharges}
                    onChange={(e) => setFormData(prev => ({ ...prev, preclosureCharges: Number(e.target.value) }))}
                  />
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={calculateRefinance}
                >
                  Calculate Refinance Benefits
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Refinance Analysis</span>
                {result && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-700">Current EMI</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{result.oldLoanEMI.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-700">New EMI</h3>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{result.newLoanEMI.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-700">Monthly Savings</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      ₹{result.monthlySavings.toLocaleString()}
                    </p>
                    <p className="text-sm text-purple-600 mt-1">
                      Break-even in {result.breakEvenMonths} months
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Loan Comparison</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Month</TableHead>
                          <TableHead>Old Balance</TableHead>
                          <TableHead>New Balance</TableHead>
                          <TableHead>Net Savings</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {result.comparison.slice(0, 12).map((item) => (
                          <TableRow key={item.month}>
                            <TableCell>{item.month}</TableCell>
                            <TableCell>₹{item.oldLoanBalance.toLocaleString()}</TableCell>
                            <TableCell>₹{item.newLoanBalance.toLocaleString()}</TableCell>
                            <TableCell className={item.savings >= 0 ? "text-green-600" : "text-red-600"}>
                              ₹{item.savings.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Enter loan details and calculate to see refinancing benefits
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            Note: This calculator provides an estimate based on current inputs. Actual savings may vary 
            based on bank policies, processing fees, and other charges. Consider consulting your financial 
            advisor before making a refinancing decision.
          </p>
        </div>
      </div>
    </div>
  );
}