'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from '@/components/ui/Input';

interface RetirementResult {
  requiredCorpus: number;
  monthlyInvestmentNeeded: number;
  yearlyBreakdown: Array<{
    age: number;
    investmentValue: number;
    yearlyInvestment: number;
    yearlyReturns: number;
  }>;
}

export default function RetirementCorpusCalculator() {
  const [formData, setFormData] = useState({
    currentAge: 30,
    retirementAge: 60,
    monthlyExpenses: 50000,
    currentSavings: 1000000,
    expectedReturn: 12,
    inflationRate: 6,
    lifeExpectancy: 85,
  });

  const [result, setResult] = useState<RetirementResult | null>(null);

  const calculateRetirementCorpus = () => {
    const {
      currentAge,
      retirementAge,
      monthlyExpenses,
      currentSavings,
      expectedReturn,
      inflationRate,
      lifeExpectancy,
    } = formData;

    const yearsToRetirement = retirementAge - currentAge;
    const retirementDuration = lifeExpectancy - retirementAge;

    // Calculate future monthly expenses considering inflation
    const futureMonthlyExpenses = monthlyExpenses * 
      Math.pow(1 + inflationRate / 100, yearsToRetirement);

    // Calculate required corpus at retirement
    const monthlyReturnRate = expectedReturn / 12 / 100;
    const numberOfMonths = retirementDuration * 12;
    const requiredCorpus = (futureMonthlyExpenses * 
      ((Math.pow(1 + monthlyReturnRate, numberOfMonths) - 1) / 
      (monthlyReturnRate * Math.pow(1 + monthlyReturnRate, numberOfMonths))));

    // Calculate required monthly investment
    const monthlyInvestmentNeeded = (requiredCorpus - 
      currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement)) /
      ((Math.pow(1 + expectedReturn / 100, yearsToRetirement) - 1) / 
      (expectedReturn / 100)) / 12;

    // Generate yearly breakdown
    const yearlyBreakdown = [];
    let currentValue = currentSavings;
    
    for (let year = 0; year <= yearsToRetirement; year++) {
      const age = currentAge + year;
      const yearlyInvestment = monthlyInvestmentNeeded * 12;
      const yearlyReturns = currentValue * (expectedReturn / 100);
      currentValue = currentValue * (1 + expectedReturn / 100) + yearlyInvestment;

      yearlyBreakdown.push({
        age,
        investmentValue: Math.round(currentValue),
        yearlyInvestment: Math.round(yearlyInvestment),
        yearlyReturns: Math.round(yearlyReturns),
      });
    }

    setResult({
      requiredCorpus: Math.round(requiredCorpus),
      monthlyInvestmentNeeded: Math.round(monthlyInvestmentNeeded),
      yearlyBreakdown,
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Retirement Corpus Calculator
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Plan your retirement savings and calculate the corpus needed for a comfortable retirement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-6 w-6 text-blue-600" />
                Retirement Planning Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Current Age</Label>
                  <Slider
                    value={[formData.currentAge]}
                    min={20}
                    max={70}
                    step={1}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, currentAge: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.currentAge} years</span>
                </div>

                <div>
                  <Label>Retirement Age</Label>
                  <Slider
                    value={[formData.retirementAge]}
                    min={formData.currentAge + 1}
                    max={80}
                    step={1}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, retirementAge: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.retirementAge} years</span>
                </div>

                <div>
                  <Label htmlFor="monthlyExpenses">
                    Current Monthly Expenses (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Your current monthly expenses excluding savings and investments
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={formData.monthlyExpenses}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthlyExpenses: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="currentSavings">Current Savings (₹)</Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={formData.currentSavings}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentSavings: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label>Expected Return (%)</Label>
                  <Slider
                    value={[formData.expectedReturn]}
                    min={4}
                    max={16}
                    step={0.5}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, expectedReturn: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.expectedReturn}%</span>
                </div>

                <div>
                  <Label>Inflation Rate (%)</Label>
                  <Slider
                    value={[formData.inflationRate]}
                    min={2}
                    max={10}
                    step={0.5}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, inflationRate: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.inflationRate}%</span>
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={calculateRetirementCorpus}
                >
                  Calculate Retirement Corpus
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
                      <h3 className="font-semibold text-blue-700">Required Corpus</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{result.requiredCorpus.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-700">Monthly Investment</h3>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{result.monthlyInvestmentNeeded.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Yearly Breakdown</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Age</TableHead>
                          <TableHead>Corpus Value</TableHead>
                          <TableHead>Returns</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {result.yearlyBreakdown.map((item) => (
                          <TableRow key={item.age}>
                            <TableCell>{item.age}</TableCell>
                            <TableCell>₹{item.investmentValue.toLocaleString()}</TableCell>
                            <TableCell>₹{item.yearlyReturns.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Enter your details and calculate to see retirement analysis
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            Note: This calculator provides an estimate based on current inputs. Actual returns may vary 
            based on market conditions, investment choices, and economic factors. Consider consulting a 
            financial advisor for personalized retirement planning.
          </p>
        </div>
      </div>
    </div>
  );
}