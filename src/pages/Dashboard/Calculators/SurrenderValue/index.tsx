"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, HelpCircle, Download } from "lucide-react";
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
import { Input } from "@/components/ui/Input";

interface SurrenderValueResult {
  surrenderValue: number;
  paidPremiums: number;
  loss: number;
  guaranteedValue: number;
  bonusValue: number;
}

export default function InsuranceSurrenderValueCalculator() {
  const [formData, setFormData] = useState({
    policyType: "traditional",
    sumAssured: 1000000,
    premiumAmount: 50000,
    premiumFrequency: "yearly",
    policyTerm: 20,
    completedYears: 5,
    bonusRate: 40, // per 1000 sum assured
  });

  const [result, setResult] = useState<SurrenderValueResult | null>(null);

  const calculateSurrenderValue = () => {
    const { sumAssured, premiumAmount, completedYears, bonusRate } = formData;

    // Total premiums paid
    const totalPremiumsPaid = premiumAmount * completedYears;

    // Guaranteed surrender value (typically 30% to 90% of premiums paid)
    let guaranteedPercentage = 30;
    if (completedYears > 7) {
      guaranteedPercentage = 50;
    }
    if (completedYears > 10) {
      guaranteedPercentage = 90;
    }

    const guaranteedValue = (totalPremiumsPaid * guaranteedPercentage) / 100;

    // Bonus calculation
    const bonusValue = (sumAssured / 1000) * bonusRate * completedYears;

    // Total surrender value
    const surrenderValue = guaranteedValue + bonusValue;

    // Loss on surrender
    const loss = totalPremiumsPaid - surrenderValue;

    setResult({
      surrenderValue,
      paidPremiums: totalPremiumsPaid,
      loss,
      guaranteedValue,
      bonusValue,
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Insurance Surrender Value Calculator
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Calculate the surrender value of your life insurance policy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-600" />
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
                      setFormData((prev) => ({ ...prev, policyType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select policy type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traditional">
                        Traditional Policy
                      </SelectItem>
                      <SelectItem value="ulip">ULIP</SelectItem>
                      <SelectItem value="endowment">
                        Endowment Policy
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sumAssured">
                    Sum Assured (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          The guaranteed amount your nominees receive on policy
                          maturity
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="sumAssured"
                    type="number"
                    value={formData.sumAssured}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        sumAssured: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="premiumAmount">Premium Amount (₹)</Label>
                  <Input
                    id="premiumAmount"
                    type="number"
                    value={formData.premiumAmount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        premiumAmount: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                <div>
                  <Label>Premium Frequency</Label>
                  <Select
                    value={formData.premiumFrequency}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        premiumFrequency: value,
                      }))
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
                  <Label htmlFor="completedYears">Completed Years</Label>
                  <Input
                    id="completedYears"
                    type="number"
                    value={formData.completedYears}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        completedYears: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={calculateSurrenderValue}
                >
                  Calculate Surrender Value
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Surrender Value Analysis</span>
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
                      <h3 className="font-semibold text-blue-700">
                        Total Premiums Paid
                      </h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{result.paidPremiums.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-700">
                        Surrender Value
                      </h3>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{result.surrenderValue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <h3 className="font-semibold text-red-700">
                      Loss on Surrender
                    </h3>
                    <p className="text-2xl font-bold text-red-600">
                      ₹{result.loss.toLocaleString()}
                    </p>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Guaranteed Value</TableCell>
                        <TableCell>
                          ₹{result.guaranteedValue.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bonus Value</TableCell>
                        <TableCell>
                          ₹{result.bonusValue.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Enter policy details and calculate to see surrender value
                  analysis
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            Note: This is an indicative calculation. Actual surrender value may
            vary based on insurance company policies, market conditions, and
            other factors. Please consult your insurance provider for exact
            values.
          </p>
        </div>
      </div>
    </div>
  );
}
