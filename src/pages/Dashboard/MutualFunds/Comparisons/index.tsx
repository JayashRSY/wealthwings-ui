import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, TrendingUp, Star, CheckCircle, X } from "lucide-react";
import { MUTUAL_FUNDS, MutualFund, RISK_LEVELS } from "@/lib/constants/mutualFundsConstants";
import { compareFunds } from "@/api/mutualFundsApi";

export default function FundComparisons() {
  const [selectedFunds, setSelectedFunds] = useState<string[]>([]);
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [maxFunds] = useState(4);

  const handleFundSelect = (fundName: string) => {
    if (selectedFunds.includes(fundName)) {
      setSelectedFunds(selectedFunds.filter(name => name !== fundName));
    } else if (selectedFunds.length < maxFunds) {
      setSelectedFunds([...selectedFunds, fundName]);
    }
  };

  const handleCompare = async () => {
    if (selectedFunds.length < 2) return;
    
    setIsLoading(true);
    try {
      const res = await compareFunds(selectedFunds);
      setComparisonResult(res.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    const risk = RISK_LEVELS.find(r => r.value === riskLevel);
    return risk?.color || "text-gray-600";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  // const getBestValue = (data: any[], key: string) => {
  //   if (data.length === 0) return null;
    
  //   const values = data.map(item => item.value);
  //   if (typeof values[0] === 'number') {
  //     return Math.max(...values);
  //   }
  //   return null;
  // };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Fund Comparison
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Compare multiple mutual funds side by side to make informed investment decisions.
          </p>
        </div>

        {/* Fund Selection */}
        <Card className="shadow-lg border-t-4 border-t-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-purple-500" />
              Select Funds to Compare
            </CardTitle>
            <CardDescription>
              Choose up to {maxFunds} funds to compare their performance, risk, and other parameters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MUTUAL_FUNDS.map((fund) => (
                <Card
                  key={fund.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedFunds.includes(fund.name)
                      ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => handleFundSelect(fund.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm">
                          {fund.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {fund.fundHouse}
                        </p>
                      </div>
                      {selectedFunds.includes(fund.name) && (
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {fund.category}
                      </Badge>
                      <Badge className={`text-xs ${getRiskColor(fund.riskLevel)}`}>
                        {fund.riskLevel}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">NAV:</span>
                      <span className="font-medium">₹{fund.nav}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">3Y Return:</span>
                      <span className="font-medium text-green-600">
                        {fund.returns["3Y"]}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Selected: {selectedFunds.length}/{maxFunds}
                </span>
                {selectedFunds.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFunds([])}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>
              
              <Button
                onClick={handleCompare}
                disabled={selectedFunds.length < 2 || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
              >
                {isLoading ? "Comparing..." : "Compare Funds"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Results */}
        {comparisonResult && (
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Fund Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableHead key={fund.id}>{fund.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Fund House</TableCell>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableCell key={fund.id}>{fund.fundHouse}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Category</TableCell>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableCell key={fund.id}>
                          <Badge variant="secondary">{fund.category}</Badge>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Risk Level</TableCell>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableCell key={fund.id}>
                          <Badge className={getRiskColor(fund.riskLevel)}>
                            {fund.riskLevel}
                          </Badge>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Rating</TableCell>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableCell key={fund.id}>
                          <div className="flex items-center gap-1">
                            {renderStars(fund.rating)}
                            <span className="text-sm">({fund.rating}/5)</span>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">NAV</TableCell>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableCell key={fund.id}>₹{fund.nav}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Min Investment</TableCell>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableCell key={fund.id}>₹{fund.minInvestment}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Expense Ratio</TableCell>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableCell key={fund.id}>{fund.expenseRatio}%</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">AUM (Cr)</TableCell>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableCell key={fund.id}>₹{fund.aum}</TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Returns Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Returns Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableHead key={fund.id}>{fund.name}</TableHead>
                      ))}
                      <TableHead>Best</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">1 Year</TableCell>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableCell key={fund.id} className="text-green-600 font-medium">
                          {fund.returns["1Y"]}%
                        </TableCell>
                      ))}
                      <TableCell className="text-green-600 font-bold">
                        {Math.max(...comparisonResult.funds.map((f: MutualFund) => f.returns["1Y"]))}%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">3 Years</TableCell>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableCell key={fund.id} className="text-green-600 font-medium">
                          {fund.returns["3Y"]}%
                        </TableCell>
                      ))}
                      <TableCell className="text-green-600 font-bold">
                        {Math.max(...comparisonResult.funds.map((f: MutualFund) => f.returns["3Y"]))}%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">5 Years</TableCell>
                      {comparisonResult.funds.map((fund: MutualFund) => (
                        <TableCell key={fund.id} className="text-green-600 font-medium">
                          {fund.returns["5Y"]}%
                        </TableCell>
                      ))}
                      <TableCell className="text-green-600 font-bold">
                        {Math.max(...comparisonResult.funds.map((f: MutualFund) => f.returns["5Y"]))}%
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Fund Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparisonResult.funds.map((fund: MutualFund) => (
                <Card key={fund.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{fund.name}</CardTitle>
                    <CardDescription>{fund.fundHouse}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {fund.description}
                    </p>
                    <div className="mt-4">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
                        Invest Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 