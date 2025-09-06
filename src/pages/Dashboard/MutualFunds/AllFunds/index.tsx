import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Star, 
  TrendingUp, 
  TrendingDown,
  ArrowUpDown,
  Eye,
  Download,
  Loader2,
  SortAsc,
  SortDesc,
  RefreshCw
} from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getAllFunds } from "@/api/mutualFundsApi";
import { MutualFund } from "@/lib/constants/mutualFundsConstants";

interface MutualFundData {
  id: string;
  name: string;
  fundHouse: string;
  category: string;
  subCategory: string;
  nav: number;
  rating: number;
  riskLevel: string;
  expenseRatio: number;
  returns: {
    "1Y": number;
    "3Y": number;
    "5Y": number;
  };
  aum: number;
  minInvestment: number;
  description: string;
  isActive: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    funds: MutualFundData[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export default function AllFunds() {
  const [fundsData, setFundsData] = useState<MutualFundData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFundHouse, setSelectedFundHouse] = useState('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [sortBy, setSortBy] = useState<keyof MutualFundData>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        setLoading(true);
        const filters: any = {};
        
        if (selectedCategory !== 'all') filters.category = selectedCategory;
        if (selectedFundHouse !== 'all') filters.fundHouse = selectedFundHouse;
        if (selectedRiskLevel !== 'all') filters.riskLevel = selectedRiskLevel;
        
        const response: ApiResponse = await getAllFunds(filters);
        
        if (response.success && response.data?.funds) {
          setFundsData(response.data.funds);
        } else {
          setError('Failed to fetch funds data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching funds');
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, [selectedCategory, selectedFundHouse, selectedRiskLevel]);

  // Get unique categories, fund houses, and risk levels for filtering
  const categories = useMemo(() => {
    const uniqueCategories = new Set(fundsData?.map(item => item.category).filter(cat => cat && cat.trim() !== ''));
    return Array.from(uniqueCategories).sort();
  }, [fundsData]);

  const fundHouses = useMemo(() => {
    const uniqueFundHouses = new Set(fundsData?.map(item => item.fundHouse).filter(house => house && house.trim() !== ''));
    return Array.from(uniqueFundHouses).sort();
  }, [fundsData]);

  const riskLevels = useMemo(() => {
    const uniqueRiskLevels = new Set(fundsData?.map(item => item.riskLevel).filter(risk => risk && risk.trim() !== ''));
    return Array.from(uniqueRiskLevels).sort();
  }, [fundsData]);

  // Handle sorting logic
  const sortedData = useMemo(() => {
    let sortableItems = [...fundsData];
    if (sortBy) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
          if (String(aValue) < String(bValue)) {
            return sortOrder === 'asc' ? -1 : 1;
          }
          if (String(aValue) > String(bValue)) {
            return sortOrder === 'asc' ? 1 : -1;
          }
          return 0;
        }
      });
    }
    return sortableItems;
  }, [fundsData, sortBy, sortOrder]);

  // Handle filtering logic
  const filteredData = useMemo(() => {
    let filtered = sortedData;

    // Apply search filter
    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        (item.name && item.name.toLowerCase().includes(lowercasedFilter)) ||
        (item.fundHouse && item.fundHouse.toLowerCase().includes(lowercasedFilter)) ||
        (item.category && item.category.toLowerCase().includes(lowercasedFilter)) ||
        (item.description && item.description.toLowerCase().includes(lowercasedFilter))
      );
    }

    return filtered;
  }, [sortedData, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedFundHouse, selectedRiskLevel, sortBy, sortOrder]);

  const handleSort = (field: keyof MutualFundData) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedFundHouse('all');
    setSelectedRiskLevel('all');
    setSortBy('name');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const formatAUM = (aum: number) => {
    if (aum >= 1000) {
      return `₹${(aum / 1000).toFixed(1)}K Cr`;
    }
    return `₹${aum} Cr`;
  };

  const formatMinInvestment = (amount: number) => {
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return `₹${amount}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 max-w-7xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3 text-lg text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            Loading mutual fund data...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 max-w-7xl">
        <div className="text-center p-8">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-destructive font-medium">⚠️ Error: {error}</p>
            <p className="text-sm text-muted-foreground mt-2">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            All Mutual Funds
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Explore and analyze all available mutual funds with detailed information and performance metrics.
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-lg border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-6 w-6 text-blue-500" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search funds..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedFundHouse} onValueChange={setSelectedFundHouse}>
                <SelectTrigger>
                  <SelectValue placeholder="Fund House" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fund Houses</SelectItem>
                  {fundHouses.map((house) => (
                    <SelectItem key={house} value={house}>
                      {house}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  {riskLevels.map((risk) => (
                    <SelectItem key={risk} value={risk}>
                      {risk}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredData.length} of {fundsData.length} funds
              </div>
              <Button variant="outline" onClick={clearFilters}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Funds Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Mutual Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-1">
                        Fund Name
                        {sortBy === 'name' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('fundHouse')}
                    >
                      <div className="flex items-center gap-1">
                        Fund House
                        {sortBy === 'fundHouse' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('category')}
                    >
                      <div className="flex items-center gap-1">
                        Category
                        {sortBy === 'category' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('nav')}
                    >
                      <div className="flex items-center gap-1">
                        NAV
                        {sortBy === 'nav' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('rating')}
                    >
                      <div className="flex items-center gap-1">
                        Rating
                        {sortBy === 'rating' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('riskLevel')}
                    >
                      <div className="flex items-center gap-1">
                        Risk Level
                        {sortBy === 'riskLevel' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('aum')}
                    >
                      <div className="flex items-center gap-1">
                        AUM
                        {sortBy === 'aum' && (
                          sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>1Y Return</TableHead>
                    <TableHead>3Y Return</TableHead>
                    <TableHead>5Y Return</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((fund) => (
                    <TableRow key={fund.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium max-w-[200px]">
                        <div>
                          <div className="font-semibold">{fund.name}</div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {fund.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{fund.fundHouse}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{fund.category}</Badge>
                      </TableCell>
                      <TableCell>₹{fund.nav.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {renderStars(fund.rating)}
                          <span className="text-sm">({fund.rating})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getRiskColor(fund.riskLevel)}`}>
                          {fund.riskLevel}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatAUM(fund.aum)}
                      </TableCell>
                      <TableCell className="text-green-600 font-medium">
                        {fund.returns["1Y"]}%
                      </TableCell>
                      <TableCell className="text-green-600 font-medium">
                        {fund.returns["3Y"]}%
                      </TableCell>
                      <TableCell className="text-green-600 font-medium">
                        {fund.returns["5Y"]}%
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Items per page:</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNum)}
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

                <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
