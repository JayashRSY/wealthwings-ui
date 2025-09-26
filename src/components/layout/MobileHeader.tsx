import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, User, Settings, LogOut } from "lucide-react";
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


interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 shadow-md bg-background border-b border-border md:hidden">
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
};

export default MobileHeader;