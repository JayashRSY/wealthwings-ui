import React, { useState, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LineChart,
  CreditCard,
  // PiggyBank,
  Calculator,
  Briefcase,
  HelpCircle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  Calendar,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { useAppSelector } from "@/hooks/useRedux";

// 1. Type nav items
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

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { pathname } = useLocation();
  const [openSubMenus, setOpenSubMenus] = useState<Record<number, boolean>>({});

  // 2. Memoize nav items
  const navItems: NavItem[] = useMemo(() => [
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
    // {
    //   label: "Financial Planning",
    //   href: "/financial-planning",
    //   icon: <PiggyBank className="w-5 h-5" />,
    //   color: "text-orange-500",
    // },
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
  ], []);
  const bottomNavItems: NavItem[] = useMemo(() => [
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
  ], []);

  // 3. Handlers
  const toggleSubMenu = useCallback((index: number) => {
    setOpenSubMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  // 4. Active logic
  const isNavItemActive = useCallback((item: NavItem) => {
    if (item.href === "/" && pathname === "/dashboard") {
      return true;
    }
    if (item.subItems) {
      const basePath = `/dashboard${item.href}`;
      return pathname === basePath || pathname.startsWith(basePath + "/");
    }
    const fullPath = `/dashboard${item.href}`;
    return pathname === fullPath || pathname.startsWith(fullPath + "/");
  }, [pathname]);

  // 5. Accessibility: keyboard toggle
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSubMenu(index);
    }
  };

  // 6. Extracted renderers for clarity
  const renderNavItem = (item: NavItem, index: number) => {
    const isActive = isNavItemActive(item);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isSubMenuOpen = openSubMenus[index] || false;
    return (
      <li key={index} className="relative">
        <div className="flex flex-col">
          <Link
            to={hasSubItems ? "#" : `/dashboard${item.href}`}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium group",
              isActive
                ? "bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 shadow-md"
                : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
            )}
            style={{ position: 'relative' }}
            onClick={(e) => {
              if (hasSubItems) {
                e.preventDefault();
                toggleSubMenu(index);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
            aria-expanded={hasSubItems ? isSubMenuOpen : undefined}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Active indicator */}
            {isActive && !isCollapsed && (
              <span
                className="absolute left-0 w-1.5 h-7 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full shadow-lg"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              />
            )}
            <span
              className={cn(
                "transition-colors",
                isActive ? item.color : "text-muted-foreground",
                isActive ? "scale-110" : "scale-100"
              )}
            >
              {item.icon}
            </span>
            {!isCollapsed && (
              <span
                className={cn(
                  "ml-2 flex-1 truncate",
                  isActive ? "font-bold" : ""
                )}
              >
                {item.label}
              </span>
            )}
            {hasSubItems && !isCollapsed && (
              <span
                className={cn(
                  "ml-auto transition-transform",
                  isSubMenuOpen ? "rotate-90" : "rotate-0"
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </Link>
          {/* Sub-menu items */}
          {!isCollapsed && hasSubItems && isSubMenuOpen && (
            <ul className="pl-6 mt-1 space-y-1 overflow-hidden">
              {item.subItems?.map((subItem, subIndex) => {
                const isSubActive =
                  pathname ===
                  `/dashboard${item.href}/${subItem.href}`;
                return (
                  <li key={subIndex} className="relative">
                    <Link
                      to={`/dashboard${item.href}/${subItem.href}`}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm relative",
                        isSubActive
                          ? "bg-gradient-to-r from-blue-200/80 to-purple-200/80 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 font-semibold shadow"
                          : "hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                      )}
                      aria-current={isSubActive ? "page" : undefined}
                    >
                      <span
                        className={cn(
                          isSubActive ? item.color : "text-muted-foreground",
                          isSubActive ? "scale-110" : "scale-100"
                        )}
                      >
                        {subItem.label === "Upload Statement" && (
                          <FileText className="h-3.5 w-3.5" />
                        )}
                        {subItem.label === "Statement History" && (
                          <Calendar className="h-3.5 w-3.5" />
                        )}
                        {subItem.label === "Recommender" && (
                          <CreditCard className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <span>{subItem.label}</span>
                      {isSubActive && (
                        <span
                          className="absolute left-0 w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full shadow"
                          style={{ top: '50%', transform: 'translateY(-50%)' }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </li>
    );
  };

  const renderBottomNavItem = (item: NavItem, index: number) => {
    const isActive = pathname === `/dashboard${item.href}`;
    return (
      <li key={index} className="relative">
        <Link
          to={`/dashboard${item.href}`}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium group",
            isActive
              ? "bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 shadow-md"
              : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
          )}
          style={{ position: 'relative' }}
          onKeyDown={(e) => handleKeyDown(e, index)}
          tabIndex={0}
          aria-current={isActive ? "page" : undefined}
        >
          {isActive && !isCollapsed && (
            <span
              className="absolute left-0 w-1.5 h-7 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full shadow-lg"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            />
          )}
          <span
            className={cn(
              "transition-colors",
              isActive ? item.color : "text-muted-foreground",
              isActive ? "scale-110" : "scale-100"
            )}
          >
            {item.icon}
          </span>
          {!isCollapsed && (
            <span
              className={cn(
                "ml-2 flex-1 truncate",
                isActive ? "font-bold" : ""
              )}
            >
              {item.label}
            </span>
          )}
        </Link>
      </li>
    );
  };

  if (!user) return <div className="w-64 bg-background/80 backdrop-blur-lg border-r border-border rounded-xl m-4 shadow-xl"></div>;

  return (
    <nav
      aria-label="Main Navigation"
      className={cn(
        "flex flex-col h-screen bg-background/80 backdrop-blur-lg border-r border-border shadow-xl transition-all duration-300",
        "rounded-xl m-4",
        isCollapsed ? "w-20" : "w-72",
        "hidden md:flex"
      )}
      style={{ minWidth: isCollapsed ? "5rem" : "16rem" }}
    >
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-1">
                  <span className="font-mono">Your Money,</span>
                  <span className="font-sans italic"> Your Way</span>
                </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-muted/60 transition-colors border border-border bg-background/60 shadow"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-6 overflow-y-auto scrollbar-hide">
        <ul className="space-y-2 px-3">
          {navItems.map(renderNavItem)}
        </ul>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border py-6 px-3">
        <ul className="space-y-2">
          {bottomNavItems.map(renderBottomNavItem)}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
