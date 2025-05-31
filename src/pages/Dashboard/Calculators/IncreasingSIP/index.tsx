'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, HelpCircle, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface SIPAnalysis {
  totalInvestment: number;
  totalValue: number;
  wealthGained: number;
  yearlyBreakdown: Array<{
    year: number;
    sipAmount: number;
    investedAmount: number;
    value: number;
    returns: number;
  }>;
}

export default function IncreasingSIPCalculator() {
  const [formData, setFormData] = useState({
    initialAmount: 10000,
    yearlyIncrease: 10, // percentage
    investmentPeriod: 20, // years
    expectedReturn: 12, // percentage
    increaseFrequency: 'yearly',
  });

  const [result, setResult] = useState<SIPAnalysis | null>(null);

  const calculateSIP = () => {
    const {
      initialAmount,
      yearlyIncrease,
      investmentPeriod,
      expectedReturn,
    } = formData;

    const yearlyBreakdown = [];
    let totalInvestment = 0;
    let totalValue = 0;
    let currentSIPAmount = initialAmount;

    for (let year = 1; year <= investmentPeriod; year++) {
      const yearlyInvestment = currentSIPAmount * 12;
      totalInvestment += yearlyInvestment;

      // Calculate returns for this year
      const yearStartValue = totalValue;
      const monthlyRate = expectedReturn / 12 / 100;
      
      // Calculate year-end value considering monthly investments
      let yearEndValue = 0;
      for (let month = 1; month <= 12; month++) {
        yearEndValue += currentSIPAmount * Math.pow(1 + monthlyRate, 13 - month);
      }
      yearEndValue += yearStartValue * Math.pow(1 + expectedReturn / 100, 1);

      const yearlyReturns = yearEndValue - yearStartValue - yearlyInvestment;
      totalValue = yearEndValue;

      yearlyBreakdown.push({
        year,
        sipAmount: currentSIPAmount,
        investedAmount: yearlyInvestment,
        value: Math.round(yearEndValue),
        returns: Math.round(yearlyReturns),
      });

      // Increase SIP amount for next year
      currentSIPAmount += (currentSIPAmount * yearlyIncrease) / 100;
    }

    setResult({
      totalInvestment: Math.round(totalInvestment),
      totalValue: Math.round(totalValue),
      wealthGained: Math.round(totalValue - totalInvestment),
      yearlyBreakdown,
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Increasing SIP Calculator
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Plan your wealth creation with step-up SIP investments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                SIP Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="initialAmount">
                    Initial Monthly SIP (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Your starting monthly SIP amount
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="initialAmount"
                    type="number"
                    value={formData.initialAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, initialAmount: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label>Yearly Increase (%)</Label>
                  <Slider
                    value={[formData.yearlyIncrease]}
                    min={0}
                    max={25}
                    step={1}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, yearlyIncrease: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.yearlyIncrease}% per year</span>
                </div>

                <div>
                  <Label>Investment Period (Years)</Label>
                  <Slider
                    value={[formData.investmentPeriod]}
                    min={5}
                    max={30}
                    step={1}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, investmentPeriod: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.investmentPeriod} years</span>
                </div>

                <div>
                  <Label>Expected Return (%)</Label>
                  <Slider
                    value={[formData.expectedReturn]}
                    min={4}
                    max={18}
                    step={0.5}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, expectedReturn: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.expectedReturn}% per annum</span>
                </div>

                <div>
                  <Label>Increase Frequency</Label>
                  <Select
                    value={formData.increaseFrequency}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, increaseFrequency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="half-yearly">Half-Yearly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={calculateSIP}
                >
                  Calculate Returns
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Investment Analysis</span>
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
                      <h3 className="font-semibold text-green-700">Total Value</h3>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{result.totalValue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-700">Wealth Gained</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      ₹{result.wealthGained.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Year-wise Breakdown</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Year</TableHead>
                          <TableHead>Monthly SIP</TableHead>
                          <TableHead>Returns</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {result.yearlyBreakdown.map((item) => (
                          <TableRow key={item.year}>
                            <TableCell>{item.year}</TableCell>
                            <TableCell>₹{item.sipAmount.toLocaleString()}</TableCell>
                            <TableCell>₹{item.returns.toLocaleString()}</TableCell>
                            <TableCell>₹{item.value.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Enter investment details and calculate to see analysis
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            Note: This calculator assumes returns are compounded monthly and SIP investments are made at 
            the beginning of each month. Actual returns may vary based on market conditions and investment choices.
          </p>
        </div>
      </div>
    </div>
  );
}