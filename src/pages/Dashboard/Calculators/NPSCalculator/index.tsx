'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Wallet, HelpCircle, Download } from "lucide-react";

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

interface NPSAnalysis {
  totalInvestment: number;
  estimatedCorpus: number;
  monthlyPension: number;
  yearlyBreakdown: Array<{
    year: number;
    age: number;
    investment: number;
    balance: number;
    returns: number;
  }>;
}

export default function NPSCalculator() {
  const [formData, setFormData] = useState({
    age: 30,
    monthlyContribution: 5000,
    employerContribution: 5000, // monthly
    expectedReturn: 10, // percentage
    equityAllocation: 50, // percentage
    retirementAge: 60,
  });

  const [result, setResult] = useState<NPSAnalysis | null>(null);

  const calculateNPS = () => {
    const {
      age,
      monthlyContribution,
      employerContribution,
      expectedReturn,
      retirementAge,
    } = formData;

    const yearlyBreakdown = [];
    let totalInvestment = 0;
    let currentBalance = 0;
    const monthlyRate = expectedReturn / 12 / 100;
    const monthlyTotalContribution = monthlyContribution + employerContribution;

    for (let year = 1; year <= retirementAge - age; year++) {
      const yearlyContribution = monthlyTotalContribution * 12;
      totalInvestment += yearlyContribution;

      // Calculate returns for this year
      let yearEndBalance = currentBalance;
      for (let month = 1; month <= 12; month++) {
        yearEndBalance += monthlyTotalContribution;
        yearEndBalance *= (1 + monthlyRate);
      }

      const yearlyReturns = yearEndBalance - currentBalance - yearlyContribution;
      currentBalance = yearEndBalance;

      yearlyBreakdown.push({
        year,
        age: age + year,
        investment: yearlyContribution,
        balance: Math.round(yearEndBalance),
        returns: Math.round(yearlyReturns),
      });
    }

    // Estimate monthly pension (using 4% withdrawal rate as a conservative estimate)
    const monthlyPension = (currentBalance * 0.04) / 12;

    setResult({
      totalInvestment: Math.round(totalInvestment),
      estimatedCorpus: Math.round(currentBalance),
      monthlyPension: Math.round(monthlyPension),
      yearlyBreakdown,
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NPS Calculator
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Plan your retirement with National Pension System investment calculator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-6 w-6 text-blue-600" />
                Investment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Current Age</Label>
                  <Slider
                    value={[formData.age]}
                    min={18}
                    max={65}
                    step={1}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, age: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.age} years</span>
                </div>

                <div>
                  <Label htmlFor="monthlyContribution">
                    Your Monthly Contribution (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Your monthly contribution to NPS
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    value={formData.monthlyContribution}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthlyContribution: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="employerContribution">
                    Employer Contribution (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Monthly contribution by your employer (if applicable)
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="employerContribution"
                    type="number"
                    value={formData.employerContribution}
                    onChange={(e) => setFormData(prev => ({ ...prev, employerContribution: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label>Expected Return (%)</Label>
                  <Slider
                    value={[formData.expectedReturn]}
                    min={6}
                    max={14}
                    step={0.5}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, expectedReturn: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.expectedReturn}% per annum</span>
                </div>

                <div>
                  <Label>Equity Allocation (%)</Label>
                  <Slider
                    value={[formData.equityAllocation]}
                    min={0}
                    max={75}
                    step={5}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, equityAllocation: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.equityAllocation}% in equity</span>
                </div>

                <div>
                  <Label>Retirement Age</Label>
                  <Slider
                    value={[formData.retirementAge]}
                    min={Math.max(formData.age + 1, 60)}
                    max={70}
                    step={1}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, retirementAge: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.retirementAge} years</span>
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={calculateNPS}
                >
                  Calculate NPS Returns
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Retirement Analysis</span>
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
                      <h3 className="font-semibold text-blue-700">Total Investment</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{result.totalInvestment.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-700">Estimated Corpus</h3>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{result.estimatedCorpus.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-700">Estimated Monthly Pension</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      ₹{result.monthlyPension.toLocaleString()}
                    </p>
                    <p className="text-sm text-purple-600 mt-1">
                      Based on 4% annual withdrawal rate
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Year-wise Breakdown</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Age</TableHead>
                          <TableHead>Investment</TableHead>
                          <TableHead>Returns</TableHead>
                          <TableHead>Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {result.yearlyBreakdown.map((item) => (
                          <TableRow key={item.year}>
                            <TableCell>{item.age}</TableCell>
                            <TableCell>₹{item.investment.toLocaleString()}</TableCell>
                            <TableCell>₹{item.returns.toLocaleString()}</TableCell>
                            <TableCell>₹{item.balance.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Enter investment details and calculate to see retirement analysis
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            Note: This calculator provides estimates based on constant returns and contributions. 
            Actual returns may vary based on market conditions, fund performance, and asset allocation choices.
            Please consult a financial advisor for personalized retirement planning.
          </p>
        </div>
      </div>
    </div>
  );
}