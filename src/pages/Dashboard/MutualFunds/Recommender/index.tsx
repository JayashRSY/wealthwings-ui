import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Star, CheckCircle } from "lucide-react";
import { 
  INVESTMENT_GOALS, 
  INVESTMENT_HORIZONS, 
  RISK_LEVELS, 
  FUND_CATEGORIES,
  INVESTMENT_AMOUNTS,
  MutualFund 
} from "@/lib/constants/mutualFundsConstants";
import { recommendFunds } from "@/api/mutualFundsApi";

// Form schema
const formSchema = z.object({
  investmentGoal: z.string().min(1, "Please select an investment goal"),
  investmentHorizon: z.string().min(1, "Please select an investment horizon"),
  riskTolerance: z.string().min(1, "Please select your risk tolerance"),
  investmentAmount: z.number().min(500, "Minimum investment amount is ₹500"),
  category: z.string().min(1, "Please select a fund category"),
});

export default function FundRecommender() {
  const [recommendationResult, setRecommendationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as Resolver<z.infer<typeof formSchema>>,
    defaultValues: {
      investmentGoal: "",
      investmentHorizon: "",
      riskTolerance: "",
      investmentAmount: 5000,
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await recommendFunds(values);
      setRecommendationResult(res.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

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

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Fund Recommender
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Get personalized mutual fund recommendations based on your investment goals, 
            risk tolerance, and financial profile.
          </p>
        </div>

        <div
          className={`grid gap-8 ${
            recommendationResult
              ? "grid-cols-1 lg:grid-cols-3"
              : "grid-cols-1 max-w-4xl mx-auto w-full"
          }`}
        >
          <div
            className={recommendationResult ? "lg:col-span-1" : "col-span-1"}
          >
            <Card className="shadow-lg border-t-4 border-t-blue-500">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Target className="h-6 w-6 text-blue-500" />
                  Investment Profile
                </CardTitle>
                <CardDescription className="text-base">
                  Tell us about your investment preferences to get personalized recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="investmentGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">
                            Investment Goal
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus-visible:ring-blue-500">
                                <SelectValue placeholder="Select your investment goal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {INVESTMENT_GOALS.map((goal) => (
                                <SelectItem key={goal} value={goal}>
                                  {goal}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-xs">
                            What are you investing for?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="investmentHorizon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">
                            Investment Horizon
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus-visible:ring-blue-500">
                                <SelectValue placeholder="Select investment horizon" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {INVESTMENT_HORIZONS.map((horizon) => (
                                <SelectItem key={horizon.value} value={horizon.value}>
                                  {horizon.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-xs">
                            How long do you plan to invest?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="riskTolerance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">
                            Risk Tolerance
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus-visible:ring-blue-500">
                                <SelectValue placeholder="Select your risk tolerance" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {RISK_LEVELS.map((risk) => (
                                <SelectItem key={risk.value} value={risk.value}>
                                  {risk.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-xs">
                            How much risk are you comfortable with?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="investmentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">
                            Investment Amount (₹)
                          </FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number(value))}
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger className="focus-visible:ring-blue-500">
                                <SelectValue placeholder="Select investment amount" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {INVESTMENT_AMOUNTS.map((amount) => (
                                <SelectItem key={amount.value} value={amount.value.toString()}>
                                  {amount.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-xs">
                            How much do you want to invest?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">
                            Fund Category
                          </FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="focus-visible:ring-blue-500">
                                <SelectValue placeholder="Select fund category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {FUND_CATEGORIES.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-xs">
                            Do you have a preference for fund category?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Finding Recommendations..." : "Get Recommendations"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {recommendationResult && (
            <div className="lg:col-span-2 space-y-6">
              {/* Reasoning */}
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Recommendation Reasoning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {recommendationResult.reasoning}
                  </p>
                </CardContent>
              </Card>

              {/* Recommended Funds */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Recommended Funds
                </h2>
                {recommendationResult.recommendedFunds.map((fund: MutualFund, index: number) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Fund Info */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">
                                {fund.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {fund.fundHouse}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {renderStars(fund.rating)}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{fund.category}</Badge>
                            <Badge className={getRiskColor(fund.riskLevel)}>
                              {fund.riskLevel} Risk
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground">
                            {fund.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">NAV:</span>
                              <span className="ml-2 font-medium">₹{fund.nav}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Min Investment:</span>
                              <span className="ml-2 font-medium">₹{fund.minInvestment}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Expense Ratio:</span>
                              <span className="ml-2 font-medium">{fund.expenseRatio}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">AUM:</span>
                              <span className="ml-2 font-medium">₹{fund.aum} Cr</span>
                            </div>
                          </div>
                        </div>

                        {/* Returns */}
                        <div className="lg:w-48 space-y-4">
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Returns</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">1 Year:</span>
                                <span className="font-medium text-green-600">
                                  {fund.returns["1Y"]}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">3 Years:</span>
                                <span className="font-medium text-green-600">
                                  {fund.returns["3Y"]}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">5 Years:</span>
                                <span className="font-medium text-green-600">
                                  {fund.returns["5Y"]}%
                                </span>
                              </div>
                            </div>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
                            Invest Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}