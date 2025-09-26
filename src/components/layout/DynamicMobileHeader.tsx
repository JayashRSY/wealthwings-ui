import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, ArrowLeft, User, Settings, LogOut, Home, CreditCard, TrendingUp, Calculator, BookOpen, Briefcase, HelpCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import ThemeButton from "./ThemeButton";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface DynamicMobileHeaderProps {
  onMenuClick: () => void;
}

const DynamicMobileHeader: React.FC<DynamicMobileHeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Define home pages where main header should appear
  const homePages = ["/", "/dashboard", "/home"];
  const isHomePage = homePages.includes(location.pathname);

  // Get page title and icon based on current route
  const getPageInfo = () => {
    const pathname = location.pathname;
    
    // Home pages
    if (isHomePage) {
      return { title: "Wealth Wings", icon: <Home className="w-5 h-5" />, showBack: false };
    }
    
    // Cards section
    if (pathname.includes("/cards")) {
      if (pathname.includes("/recommender")) {
        return { title: "Card Recommender", icon: <CreditCard className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/statement-upload")) {
        return { title: "Upload Statement", icon: <CreditCard className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/statement-history")) {
        return { title: "Statement History", icon: <CreditCard className="w-5 h-5" />, showBack: true };
      }
      return { title: "Cards", icon: <CreditCard className="w-5 h-5" />, showBack: true };
    }
    
    // Mutual Funds section
    if (pathname.includes("/mutual-funds")) {
      if (pathname.includes("/recommender")) {
        return { title: "Fund Recommender", icon: <TrendingUp className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/comparisons")) {
        return { title: "Compare Funds", icon: <TrendingUp className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/all-funds")) {
        return { title: "All Funds", icon: <TrendingUp className="w-5 h-5" />, showBack: true };
      }
      return { title: "Mutual Funds", icon: <TrendingUp className="w-5 h-5" />, showBack: true };
    }
    
    // Calculators section
    if (pathname.includes("/calculators")) {
      if (pathname.includes("/mf-commission")) {
        return { title: "MF Commission", icon: <Calculator className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/tax-regime")) {
        return { title: "Tax Regime", icon: <Calculator className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/floating-interest")) {
        return { title: "Floating Interest", icon: <Calculator className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/mf-overlap")) {
        return { title: "MF Overlap", icon: <Calculator className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/surrender-value")) {
        return { title: "Surrender Value", icon: <Calculator className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/retirement-corpus")) {
        return { title: "Retirement Corpus", icon: <Calculator className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/loan-refinance")) {
        return { title: "Loan Refinance", icon: <Calculator className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/insurance-commission")) {
        return { title: "Insurance Commission", icon: <Calculator className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/increasing-sip")) {
        return { title: "Increasing SIP", icon: <Calculator className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/hra-exemption")) {
        return { title: "HRA Exemption", icon: <Calculator className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/nps-calculator")) {
        return { title: "NPS Calculator", icon: <Calculator className="w-5 h-5" />, showBack: true };
      }
      return { title: "Calculators", icon: <Calculator className="w-5 h-5" />, showBack: true };
    }
    
    // Blogs section
    if (pathname.includes("/blogs")) {
      if (pathname.includes("/new")) {
        return { title: "Create Blog", icon: <BookOpen className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/edit")) {
        return { title: "Edit Blog", icon: <BookOpen className="w-5 h-5" />, showBack: true };
      }
      if (pathname.includes("/")) {
        const segments = pathname.split('/');
        if (segments.length > 2 && segments[2]) {
          return { title: "Blog Detail", icon: <BookOpen className="w-5 h-5" />, showBack: true };
        }
      }
      return { title: "Blogs", icon: <BookOpen className="w-5 h-5" />, showBack: true };
    }
    
    // Other pages
    if (pathname.includes("/analytics")) {
      return { title: "Analytics", icon: <TrendingUp className="w-5 h-5" />, showBack: true };
    }
    if (pathname.includes("/services")) {
      return { title: "Services", icon: <Briefcase className="w-5 h-5" />, showBack: true };
    }
    if (pathname.includes("/profile")) {
      return { title: "Profile", icon: <User className="w-5 h-5" />, showBack: true };
    }
    if (pathname.includes("/about")) {
      return { title: "About", icon: <HelpCircle className="w-5 h-5" />, showBack: true };
    }
    
    // Finance tracker
    if (pathname.includes("/finance-tracker")) {
      return { title: "Finance Tracker", icon: <Calculator className="w-5 h-5" />, showBack: true };
    }
    
    return { title: "Wealth Wings", icon: <Home className="w-5 h-5" />, showBack: false };
  };

  const pageInfo = getPageInfo();

  const handleBack = () => {
    navigate(-1); // Go back in history
  };

  // Home page header (main header)
  if (isHomePage) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 shadow-md bg-background/95 backdrop-blur-sm border-b border-border md:hidden mobile-header">
        {/* Left side - Menu button and logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="p-2 hover:bg-muted/60 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <img
              src="/images/coin.png"
              alt="Wealth Wings Logo"
              className="w-6 h-6 object-contain"
              width={24}
              height={24}
            />
            <div className="text-lg font-bold text-foreground">Wealth Wings</div>
          </div>
        </div>

        {/* Right side - User menu */}
        <nav>
          {user ? (
            <div className="flex items-center space-x-2">
              <ThemeButton />
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar className="h-7 w-7 cursor-pointer">
                    {user.profilePicture ? (
                      <AvatarImage src={user.profilePicture} />
                    ) : (
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name || user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <Settings className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <ThemeButton />
              <Button 
                onClick={() => navigate("/login")}
                size="sm"
                className="text-xs"
              >
                Login
              </Button>
            </div>
          )}
        </nav>
      </header>
    );
  }

  // Contextual header for other pages
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 shadow-md bg-background/95 backdrop-blur-sm border-b border-border md:hidden mobile-header">
      {/* Left side - Back button and page info */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="p-2 hover:bg-muted/60 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <span className={cn("w-5 h-5", pageInfo.icon.props.className)}>
            {pageInfo.icon.props.children}
          </span>
          <div className="text-base font-semibold text-foreground truncate max-w-[150px]">
            {pageInfo.title}
          </div>
        </div>
      </div>

      {/* Right side - Menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="p-2 hover:bg-muted/60 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </Button>
    </header>
  );
};

export default DynamicMobileHeader;