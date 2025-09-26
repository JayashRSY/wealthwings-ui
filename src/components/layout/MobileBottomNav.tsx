import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CreditCard, 
  Calculator, 
  TrendingUp,
  MoreHorizontal 
} from "lucide-react";

interface MobileBottomNavProps {
  onMoreClick: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onMoreClick }) => {
  const { pathname } = useLocation();

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
    if (href === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all",
                active 
                  ? "bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              <Icon className={cn("w-5 h-5", active && "scale-110", item.color)} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
        
        {/* More button */}
        <button
          onClick={onMoreClick}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all text-muted-foreground hover:text-foreground hover:bg-muted/60"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-xs font-medium">More</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;