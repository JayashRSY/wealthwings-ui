import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { 
  LayoutDashboard, 
  CreditCard, 
  Calculator, 
  TrendingUp,
  MoreHorizontal,
  Zap,
} from "lucide-react";

interface MobileBottomNavProps {
  onMoreClick: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onMoreClick }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  // Don't render bottom nav if user is not logged in
  if (!user) {
    return null;
  }

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      color: "text-blue-500",
    },
    {
      label: "Cards",
      href: "/dashboard/cards",
      icon: CreditCard,
      color: "text-green-500",
    },
    {
      label: "Electricity",
      href: "/dashboard/electricity",
      icon: Zap,
      color: "text-yellow-500",
    },
    {
      label: "Mutual Funds",
      href: "/dashboard/mutual-funds",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
    {
      label: "Calculators",
      href: "/dashboard/calculators",
      icon: Calculator,
      color: "text-cyan-500",
    },
  ];

  const isActive = (href: string) => {
    // For dashboard root - only active when exactly on /dashboard
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    
    // For other routes - active when pathname starts with the href
    return pathname.startsWith(href);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border shadow-2xl z-50 safe-area-pb">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-2 rounded-2xl transition-all duration-200 active:scale-95",
                "min-w-[64px] max-w-[80px] flex-1",
                active 
                  ? "bg-gradient-to-r from-blue-100/90 to-purple-100/90 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <div className={cn(
                "relative p-2 rounded-full transition-all duration-200",
                active ? "bg-white/20 dark:bg-white/10" : ""
              )}>
                <Icon className={cn("w-6 h-6 transition-all", active && "scale-110", item.color)} />
                {active && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                )}
              </div>
              <span className={cn(
                "text-[11px] font-semibold transition-all duration-200 truncate",
                active ? "text-blue-700 dark:text-blue-300" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
        
        {/* More button */}
        <button
          onClick={onMoreClick}
          className={cn(
            "flex flex-col items-center gap-1 px-2 py-2 rounded-2xl transition-all duration-200 active:scale-95",
            "min-w-[64px] max-w-[80px] flex-1",
            "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <div className="relative p-2 rounded-full">
            <MoreHorizontal className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-semibold truncate">More</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;