'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Percent, HelpCircle, Download } from "lucide-react";
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

interface EMIBreakdown {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
  interestRate: number;
}

export default function FloatingInterestCalculator() {
  const [formData, setFormData] = useState({
    loanAmount: 1000000,
    initialRate: 8.5,
    tenure: 20,
    rateChangeInterval: 3, // months
    expectedRateChange: 0.25, // percentage points
  });

  const [breakdown, setBreakdown] = useState<EMIBreakdown[]>([]);

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const calculateBreakdown = () => {
    const {
      loanAmount,
      initialRate,
      tenure,
      rateChangeInterval,
      expectedRateChange,
    } = formData;

    let remainingPrincipal = loanAmount;
    let currentRate = initialRate;
    const breakdown: EMIBreakdown[] = [];

    for (let month = 1; month <= tenure * 12; month++) {
      // Adjust interest rate periodically
      if (month % rateChangeInterval === 0) {
        currentRate += expectedRateChange;
      }

      const monthlyRate = currentRate / 12 / 100;
      const emi = calculateEMI(remainingPrincipal, currentRate, tenure - Math.floor((month - 1) / 12));
      const interest = remainingPrincipal * monthlyRate;
      const principal = emi - interest;
      remainingPrincipal -= principal;

      breakdown.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principal),
        interest: Math.round(interest),
        balance: Math.round(remainingPrincipal),
        interestRate: currentRate,
      });
    }

    setBreakdown(breakdown);
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Floating Interest Rate Calculator
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Calculate EMIs with varying interest rates over your loan tenure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-6 w-6 text-blue-600" />
                Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loanAmount">
                    Loan Amount (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Total loan amount you want to borrow
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={formData.loanAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, loanAmount: Number(e.target.value) })
                    }
                  />
                </div>

                <div>
                  <Label>Initial Interest Rate (%)</Label>
                  <Slider
                    value={[formData.initialRate]}
                    min={5}
                    max={15}
                    step={0.1}
                    onValueChange={(value) =>
                      setFormData({ ...formData, initialRate: value[0] })
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.initialRate}%</span>
                </div>

                <div>
                  <Label>Loan Tenure (Years)</Label>
                  <Slider
                    value={[formData.tenure]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) =>
                      setFormData({ ...formData, tenure: value[0] })
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.tenure} years</span>
                </div>

                <div>
                  <Label>Expected Rate Change (%)</Label>
                  <Slider
                    value={[formData.expectedRateChange]}
                    min={-0.5}
                    max={0.5}
                    step={0.05}
                    onValueChange={(value) =>
                      setFormData({ ...formData, expectedRateChange: value[0] })
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">
                    {formData.expectedRateChange > 0 ? '+' : ''}
                    {formData.expectedRateChange}% every {formData.rateChangeInterval} months
                  </span>
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={calculateBreakdown}
                >
                  Calculate EMI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>EMI Breakdown</span>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Schedule
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {breakdown.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>EMI</TableHead>
                        <TableHead>Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {breakdown.map((item) => (
                        <TableRow key={item.month}>
                          <TableCell>{item.month}</TableCell>
                          <TableCell>{item.interestRate.toFixed(2)}%</TableCell>
                          <TableCell>₹{item.emi.toLocaleString()}</TableCell>
                          <TableCell>₹{item.balance.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}

                {breakdown.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-700">Initial EMI</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{breakdown[0].emi.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold text-purple-700">Final EMI</h3>
                      <p className="text-2xl font-bold text-purple-600">
                        ₹{breakdown[breakdown.length - 1].emi.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            Note: This calculator assumes periodic rate changes as specified. Actual rates may vary
            based on market conditions and lender policies.
          </p>
        </div>
      </div>
    </div>
  );
}