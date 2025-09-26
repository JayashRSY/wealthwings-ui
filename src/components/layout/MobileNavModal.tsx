import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LineChart,
  CreditCard,
  Calculator,
  Briefcase,
  HelpCircle,
  MessageSquare,
  BookOpen,
  Wallet,
  TrendingUp,
  X,
  ChevronRight,
  FileText,
  Calendar,
} from "lucide-react";

interface SubNavItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  subItems?: SubNavItem[];
}

interface MobileNavModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavModal: React.FC<MobileNavModalProps> = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();


  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="w-5 h-5" />,
      color: "text-blue-500",
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <LineChart className="w-5 h-5" />,
      color: "text-purple-500",
    },
    {
      label: "Finance Tracker",
      href: "/finance-tracker",
      icon: <Wallet className="w-5 h-5" />,
      color: "text-orange-500",
    },
    {
      label: "Cards",
      href: "/cards",
      icon: <CreditCard className="w-5 h-5" />,
      color: "text-green-500",
      subItems: [
        { label: "Recommender", href: "recommender" },
        { label: "Upload Statement", href: "statement-upload" },
        { label: "Statement History", href: "statement-history" },
      ],
    },
    {
      label: "Mutual Funds",
      href: "/mutual-funds",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-emerald-500",
      subItems: [
        { label: "Dashboard", href: "" },
        { label: "All Funds", href: "all-funds" },
        { label: "Fund Recommender", href: "recommender" },
        { label: "Compare Funds", href: "comparisons" },
      ],
    },
    {
      label: "Finance Calculators",
      href: "/calculators",
      icon: <Calculator className="w-5 h-5" />,
      color: "text-cyan-500",
    },
    {
      label: "Services",
      href: "/services",
      icon: <Briefcase className="w-5 h-5" />,
      color: "text-indigo-500",
    },
    {
      label: "Blogs",
      href: "/blogs",
      icon: <BookOpen className="w-5 h-5" />,
      color: "text-pink-500",
      subItems: [
        { label: "All Blogs", href: "" },
        { label: "Create New", href: "new" },
      ],
    },
  ];

  const bottomNavItems: NavItem[] = [
    {
      label: "Help",
      href: "/help",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "text-gray-500",
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "text-gray-500",
    },
  ];

  const isNavItemActive = (item: NavItem) => {
    if (item.href === "/" && pathname === "/dashboard") {
      return true;
    }
    if (item.subItems) {
      const basePath = `/dashboard${item.href}`;
      return pathname === basePath || pathname.startsWith(basePath + "/");
    }
    const fullPath = `/dashboard${item.href}`;
    return pathname === fullPath || pathname.startsWith(fullPath + "/");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="absolute left-0 top-0 h-full w-80 bg-background shadow-xl animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <img
              src="/images/coin.png"
              alt="Wealth Wings Logo"
              className="w-6 h-6 object-contain"
              width={24}
              height={24}
            />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Wealth Wings
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted/60 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex flex-col h-[calc(100%-4rem)]">
          {/* Main Navigation */}
          <div className="flex-1 py-6 overflow-y-auto scrollbar-hide">
            <nav className="space-y-1 px-3">
              {navItems.map((item, index) => {
                const isActive = isNavItemActive(item);
                const hasSubItems = item.subItems && item.subItems.length > 0;
                
                return (
                  <div key={index} className="space-y-1">
                    <Link
                      to={hasSubItems ? `#` : `/dashboard${item.href}`}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg transition-all font-medium",
                        isActive
                          ? "bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 shadow-md"
                          : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                      )}
                      onClick={(e) => {
                        if (hasSubItems) {
                          e.preventDefault();
                        } else {
                          onClose();
                        }
                      }}
                    >
                      <span className={cn(isActive ? item.color : "text-muted-foreground")}>
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {hasSubItems && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Link>
                    
                    {/* Sub-items */}
                    {hasSubItems && (
                      <div className="pl-6 space-y-1">
                        {item.subItems?.map((subItem, subIndex) => {
                          const isSubActive = pathname === `/dashboard${item.href}/${subItem.href}`;
                          return (
                            <Link
                              key={subIndex}
                              to={`/dashboard${item.href}/${subItem.href}`}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm",
                                isSubActive
                                  ? "bg-gradient-to-r from-blue-200/80 to-purple-200/80 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 font-semibold shadow"
                                  : "hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                              )}
                              onClick={onClose}
                            >
                              <span className={cn(isSubActive ? item.color : "text-muted-foreground")}>
                                {subItem.label === "Upload Statement" && <FileText className="h-3.5 w-3.5" />}
                                {subItem.label === "Statement History" && <Calendar className="h-3.5 w-3.5" />}
                                {subItem.label === "Recommender" && <CreditCard className="h-3.5 w-3.5" />}
                                {!["Upload Statement", "Statement History", "Recommender"].includes(subItem.label) && (
                                  <div className="w-3.5 h-3.5 rounded-full bg-current opacity-50" />
                                )}
                              </span>
                              <span>{subItem.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-border py-4 px-3">
            <nav className="space-y-1">
              {bottomNavItems.map((item, index) => {
                const isActive = pathname === `/dashboard${item.href}`;
                return (
                  <Link
                    key={index}
                    to={`/dashboard${item.href}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg transition-all font-medium",
                      isActive
                        ? "bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 shadow-md"
                        : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                    )}
                    onClick={onClose}
                  >
                    <span className={cn(isActive ? item.color : "text-muted-foreground")}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavModal;