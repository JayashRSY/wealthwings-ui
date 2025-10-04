import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, Wallet, CreditCard, PiggyBank, TrendingUp, FileText, Download, Eye, Calendar } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import BankStatements from "@/components/BankStatements";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
  { name: "May", value: 600 },
  { name: "Jun", value: 800 },
];

interface Statement {
  id: string;
  statement_date: string;
  billing_period: string;
  total_amount: number;
  minimum_due: number;
  due_date: string;
  file_path: string;
  created_at: string;
}

const Dashboard = () => {
  // TODO: Replace with theme from your theme hook if needed
  const isDark = false;
  const [statements, setStatements] = useState<Statement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Replace with real API call
    setIsLoading(true);
    setTimeout(() => {
      setStatements([
        {
          id: "1",
          statement_date: new Date().toISOString(),
          billing_period: "01 May - 31 May",
          total_amount: 12345,
          minimum_due: 1234,
          due_date: new Date().toISOString(),
          file_path: "statement1.pdf",
          created_at: new Date().toISOString(),
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, [user]);

  const downloadStatement = async (filePath: string) => {
    // TODO: Implement download logic
    alert(`Download: ${filePath}`);
  };

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Financial Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your finances, investments, and spending patterns in real-time.
        </p>
      </div>

      <BankStatements />
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹1,20,000</div>
            <div className="flex items-center mt-1 text-green-500 dark:text-green-400 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹45,000</div>
            <div className="flex items-center mt-1 text-red-500 dark:text-red-400 text-sm">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              <span>-3.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Investments</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹3,20,000</div>
            <div className="flex items-center mt-1 text-green-500 dark:text-green-400 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+8.7% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹75,000</div>
            <div className="flex items-center mt-1 text-green-500 dark:text-green-400 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+5.3% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-muted/50 dark:bg-muted/20 backdrop-blur-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background dark:data-[state=active]:bg-background/80">Overview</TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-background dark:data-[state=active]:bg-background/80">Expenses</TabsTrigger>
          <TabsTrigger value="investments" className="data-[state=active]:bg-background dark:data-[state=active]:bg-background/80">Investments</TabsTrigger>
          <TabsTrigger value="statements" className="data-[state=active]:bg-background dark:data-[state=active]:bg-background/80">Credit Card Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Cash Flow Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#f0f0f0"} />
                  <XAxis dataKey="name" stroke={isDark ? "#aaa" : "#666"} />
                  <YAxis stroke={isDark ? "#aaa" : "#666"} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#222' : 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                      color: isDark ? '#eee' : '#333'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card className="border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { category: "Food", amount: "₹12,000", percentage: 30 },
                  { category: "Rent", amount: "₹20,000", percentage: 45 },
                  { category: "Transport", amount: "₹5,000", percentage: 15 },
                  { category: "Entertainment", amount: "₹3,000", percentage: 10 },
                ].map((item) => (
                  <li key={item.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{item.category}</span>
                      <span className="text-muted-foreground">{item.amount}</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments">
          <Card className="border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Investment Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { type: "Mutual Funds", amount: "₹1,50,000", growth: "+12%" },
                  { type: "Stocks", amount: "₹90,000", growth: "+8%" },
                  { type: "Crypto", amount: "₹30,000", growth: "-5%" },
                ].map((item) => (
                  <li key={item.type} className="flex items-center justify-between p-4 bg-muted/50 dark:bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">{item.type}</div>
                      <div className="text-sm text-muted-foreground">Current Value</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">{item.amount}</div>
                      <div className={`text-sm ${
                        item.growth.startsWith("+") ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
                      }`}>
                        {item.growth}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* New Credit Card Statements Tab */}
        <TabsContent value="statements">
          <Card className="border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Recent Credit Card Statements
              </CardTitle>
              <Link to="/dashboard/cards/statement-upload">
                <Button size="sm" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Upload New Statement
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading statements...</div>
              ) : statements.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">You haven&apos;t uploaded any statements yet.</p>
                  <Link to="/dashboard/cards/statement-upload">
                    <Button>Upload Your First Statement</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Statement Date</TableHead>
                        <TableHead>Billing Period</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {statements.map((statement) => (
                        <TableRow key={statement.id}>
                          <TableCell>
                            {format(new Date(statement.statement_date), 'dd MMM yyyy')}
                          </TableCell>
                          <TableCell>{statement.billing_period}</TableCell>
                          <TableCell>₹{statement.total_amount.toLocaleString()}</TableCell>
                          <TableCell>
                            {format(new Date(statement.due_date), 'dd MMM yyyy')}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => downloadStatement(statement.file_path)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Link to={`/dashboard/cards/statement-details/${statement.id}`}>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 text-right">
                    <Link to="/dashboard/cards/statement-history">
                      <Button variant="link" className="text-sm">
                        View All Statements →
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
