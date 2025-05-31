'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Building2, HelpCircle, Download } from "lucide-react";
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
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/Input';

interface HRAExemption {
  basicSalary: number;
  hraReceived: number;
  rentPaid: number;
  cityType: 'metro' | 'non-metro';
  exemptedAmount: number;
  taxableHRA: number;
  breakdown: {
    actualHRA: number;
    rentExcess: number;
    basicPercent: number;
    lowestAmount: number;
  };
}

export default function HRAExemptionCalculator() {
  const [formData, setFormData] = useState({
    basicSalary: 50000, // monthly
    hraReceived: 20000, // monthly
    rentPaid: 25000, // monthly
    cityType: 'metro',
  });

  const [result, setResult] = useState<HRAExemption | null>(null);

  const calculateHRA = () => {
    const {
      basicSalary,
      hraReceived,
      rentPaid,
      cityType,
    } = formData;

    // Calculate as per HRA exemption rules
    const actualHRA = hraReceived;
    const rentExcess = rentPaid - (0.1 * basicSalary); // Rent paid minus 10% of basic salary
    const basicPercent = basicSalary * (cityType === 'metro' ? 0.5 : 0.4); // 50% for metro, 40% for non-metro

    // Find the lowest of the three amounts
    const exemptedAmount = Math.min(
      actualHRA,
      rentExcess > 0 ? rentExcess : 0,
      basicPercent
    );

    const taxableHRA = hraReceived - exemptedAmount;

    setResult({
      basicSalary,
      hraReceived,
      rentPaid,
      cityType: cityType as 'metro' | 'non-metro',
      exemptedAmount,
      taxableHRA,
      breakdown: {
        actualHRA,
        rentExcess: rentExcess > 0 ? rentExcess : 0,
        basicPercent,
        lowestAmount: exemptedAmount,
      },
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HRA Exemption Calculator
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Calculate your House Rent Allowance tax exemption as per Income Tax rules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-blue-600" />
                Salary Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="basicSalary">
                    Basic Salary (Monthly) (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Your monthly basic salary as per salary slip
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="basicSalary"
                    type="number"
                    value={formData.basicSalary}
                    onChange={(e) => setFormData(prev => ({ ...prev, basicSalary: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="hraReceived">
                    HRA Received (Monthly) (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Monthly HRA amount received from employer
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="hraReceived"
                    type="number"
                    value={formData.hraReceived}
                    onChange={(e) => setFormData(prev => ({ ...prev, hraReceived: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="rentPaid">
                    Rent Paid (Monthly) (₹)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Monthly rent paid for accommodation
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="rentPaid"
                    type="number"
                    value={formData.rentPaid}
                    onChange={(e) => setFormData(prev => ({ ...prev, rentPaid: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label>City Type</Label>
                  <Select
                    value={formData.cityType}
                    onValueChange={(value: 'metro' | 'non-metro') => 
                      setFormData(prev => ({ ...prev, cityType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metro">Metro City (50%)</SelectItem>
                      <SelectItem value="non-metro">Non-Metro City (40%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={calculateHRA}
                >
                  Calculate HRA Exemption
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Exemption Analysis</span>
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
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-700">Exempted Amount</h3>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{result.exemptedAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-700">Taxable HRA</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{result.taxableHRA.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Calculation Breakdown</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Actual HRA Received</TableCell>
                          <TableCell>₹{result.breakdown.actualHRA.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Rent Excess of 10% Basic</TableCell>
                          <TableCell>₹{result.breakdown.rentExcess.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            {result.cityType === 'metro' ? '50%' : '40%'} of Basic Salary
                          </TableCell>
                          <TableCell>₹{result.breakdown.basicPercent.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow className="bg-gray-50">
                          <TableCell className="font-medium">Lowest Amount (Exempted)</TableCell>
                          <TableCell>₹{result.breakdown.lowestAmount.toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="text-sm text-gray-600 space-y-2">
                    <p>HRA Exemption is calculated as the lowest of:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Actual HRA received</li>
                      <li>Rent paid minus 10% of basic salary</li>
                      <li>{result.cityType === 'metro' ? '50%' : '40%'} of basic salary</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Enter salary details and calculate to see HRA exemption analysis
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            Note: This calculator provides estimates based on standard HRA exemption rules. 
            Please consult a tax professional for detailed tax planning and actual exemption claims.
          </p>
        </div>
      </div>
    </div>
  );
}