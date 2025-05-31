"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LineChart, HelpCircle, Search, Download } from "lucide-react";
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

interface Fund {
  id: string;
  name: string;
  category: string;
  holdings: Array<{
    stock: string;
    weight: number;
  }>;
}

interface OverlapResult {
  overlapPercentage: number;
  commonHoldings: Array<{
    stock: string;
    weightFund1: number;
    weightFund2: number;
  }>;
}

export default function MutualFundOverlapCalculator() {
  const [selectedFunds, setSelectedFunds] = useState<{
    fund1: string | null;
    fund2: string | null;
  }>({
    fund1: null,
    fund2: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [overlapResult, setOverlapResult] = useState<OverlapResult | null>(
    null
  );

  // Sample mutual fund data (in real app, this would come from an API)
  const sampleFunds: Fund[] = [
    {
      id: "1",
      name: "HDFC Top 100 Fund",
      category: "Large Cap",
      holdings: [
        { stock: "HDFC Bank", weight: 8.5 },
        { stock: "ICICI Bank", weight: 7.2 },
        { stock: "Infosys", weight: 6.8 },
      ],
    },
    {
      id: "2",
      name: "Axis Bluechip Fund",
      category: "Large Cap",
      holdings: [
        { stock: "HDFC Bank", weight: 9.1 },
        { stock: "TCS", weight: 7.5 },
        { stock: "Infosys", weight: 7.0 },
      ],
    },
  ];

  const calculateOverlap = () => {
    if (!selectedFunds.fund1 || !selectedFunds.fund2) {
      return;
    }

    const fund1 = sampleFunds.find((f) => f.id === selectedFunds.fund1);
    const fund2 = sampleFunds.find((f) => f.id === selectedFunds.fund2);

    if (!fund1 || !fund2) {
      return;
    }

    const commonStocks = fund1.holdings.filter((h1) =>
      fund2.holdings.some((h2) => h2.stock === h1.stock)
    );

    const overlapPercentage =
      (commonStocks.length /
        Math.min(fund1.holdings.length, fund2.holdings.length)) *
      100;

    const commonHoldings = commonStocks.map((h1) => ({
      stock: h1.stock,
      weightFund1: h1.weight,
      weightFund2:
        fund2.holdings.find((h2) => h2.stock === h1.stock)?.weight || 0,
    }));

    setOverlapResult({
      overlapPercentage,
      commonHoldings,
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mutual Fund Overlap Calculator
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Compare mutual fund portfolios to find overlap in holdings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fund Selection Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-6 w-6 text-blue-600" />
                Select Mutual Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>
                    Search Funds
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 ml-2 inline-block text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Search for mutual funds by name or category
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search funds..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Fund 1</Label>
                    <Select
                      value={selectedFunds.fund1 || ""}
                      onValueChange={(value) =>
                        setSelectedFunds((prev) => ({ ...prev, fund1: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select first fund" />
                      </SelectTrigger>
                      <SelectContent>
                        {sampleFunds.map((fund) => (
                          <SelectItem key={fund.id} value={fund.id}>
                            {fund.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Fund 2</Label>
                    <Select
                      value={selectedFunds.fund2 || ""}
                      onValueChange={(value) =>
                        setSelectedFunds((prev) => ({ ...prev, fund2: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select second fund" />
                      </SelectTrigger>
                      <SelectContent>
                        {sampleFunds.map((fund) => (
                          <SelectItem key={fund.id} value={fund.id}>
                            {fund.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={calculateOverlap}
                  disabled={!selectedFunds.fund1 || !selectedFunds.fund2}
                >
                  Calculate Overlap
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Portfolio Overlap Analysis</span>
                {overlapResult && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {overlapResult ? (
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-700">
                      Overlap Percentage
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {overlapResult.overlapPercentage.toFixed(1)}%
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Common Holdings</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Stock</TableHead>
                          <TableHead>Fund 1 Weight</TableHead>
                          <TableHead>Fund 2 Weight</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {overlapResult.commonHoldings.map((holding) => (
                          <TableRow key={holding.stock}>
                            <TableCell>{holding.stock}</TableCell>
                            <TableCell>
                              {holding.weightFund1.toFixed(2)}%
                            </TableCell>
                            <TableCell>
                              {holding.weightFund2.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Select two funds and calculate to see overlap analysis
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            Note: This analysis is based on the latest available portfolio
            disclosures. Actual fund holdings may vary. Consider consulting a
            financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
