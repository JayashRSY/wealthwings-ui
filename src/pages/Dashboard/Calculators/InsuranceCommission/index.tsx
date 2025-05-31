'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { IndianRupee, HelpCircle, Download } from "lucide-react";
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

interface CommissionAnalysis {
  firstYearCommission: number;
  renewalCommission: number;
  totalCommission: number;
  yearlyBreakdown: Array<{
    year: number;
    premium: number;
    commission: number;
    commissionRate: number;
  }>;
}

export default function InsuranceCommissionAnalyser() {
  const [formData, setFormData] = useState({
    policyType: 'term',
    premiumAmount: 25000,
    premiumFrequency: 'yearly',
    policyTerm: 20,
    firstYearRate: 35, // percentage
    renewalRate: 5, // percentage
  });

  const [result, setResult] = useState<CommissionAnalysis | null>(null);

  const calculateCommission = () => {
    const {
      premiumAmount,
      policyTerm,
      firstYearRate,
      renewalRate,
    } = formData;

    const yearlyBreakdown = [];
    let totalCommission = 0;
    let firstYearCommission = 0;
    let renewalCommission = 0;

    for (let year = 1; year <= policyTerm; year++) {
      const commissionRate = year === 1 ? firstYearRate : renewalRate;
      const commission = (premiumAmount * commissionRate) / 100;

      if (year === 1) {
        firstYearCommission = commission;
      } else {
        renewalCommission += commission;
      }

      totalCommission += commission;

      yearlyBreakdown.push({
        year,
        premium: premiumAmount,
        commission,
        commissionRate,
      });
    }

    setResult({
      firstYearCommission,
      renewalCommission,
      totalCommission,
      yearlyBreakdown,
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Insurance Commission Analyser
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Calculate and analyze insurance agent commissions across policy terms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-6 w-6 text-blue-600" />
                Policy Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Policy Type</Label>
                  <Select
                    value={formData.policyType}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, policyType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select policy type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="term">Term Insurance</SelectItem>
                      <SelectItem value="endowment">Endowment Plan</SelectItem>
                      <SelectItem value="ulip">ULIP</SelectItem>
                      <SelectItem value="health">Health Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="premiumAmount">
                    Premium Amount (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Annual premium amount for the policy
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="premiumAmount"
                    type="number"
                    value={formData.premiumAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, premiumAmount: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label>Premium Frequency</Label>
                  <Select
                    value={formData.premiumFrequency}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, premiumFrequency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Policy Term (Years)</Label>
                  <Slider
                    value={[formData.policyTerm]}
                    min={5}
                    max={30}
                    step={1}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, policyTerm: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.policyTerm} years</span>
                </div>

                <div>
                  <Label>First Year Commission Rate (%)</Label>
                  <Slider
                    value={[formData.firstYearRate]}
                    min={0}
                    max={50}
                    step={1}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, firstYearRate: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.firstYearRate}%</span>
                </div>

                <div>
                  <Label>Renewal Commission Rate (%)</Label>
                  <Slider
                    value={[formData.renewalRate]}
                    min={0}
                    max={15}
                    step={0.5}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, renewalRate: value[0] }))
                    }
                    className="mt-2"
                  />
                  <span className="text-sm text-gray-500">{formData.renewalRate}%</span>
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={calculateCommission}
                >
                  Calculate Commission
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Commission Analysis</span>
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
                      <h3 className="font-semibold text-blue-700">First Year</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{result.firstYearCommission.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-700">Renewal Years</h3>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{result.renewalCommission.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-700">Total Commission</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      ₹{result.totalCommission.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Year-wise Breakdown</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Year</TableHead>
                          <TableHead>Premium</TableHead>
                          <TableHead>Rate</TableHead>
                          <TableHead>Commission</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {result.yearlyBreakdown.map((item) => (
                          <TableRow key={item.year}>
                            <TableCell>{item.year}</TableCell>
                            <TableCell>₹{item.premium.toLocaleString()}</TableCell>
                            <TableCell>{item.commissionRate}%</TableCell>
                            <TableCell>₹{item.commission.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Enter policy details and calculate to see commission analysis
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            Note: Commission rates may vary based on insurance company, policy type, and regulatory guidelines. 
            This calculator provides estimates based on typical commission structures. Actual commissions may differ.
          </p>
        </div>
      </div>
    </div>
  );
}