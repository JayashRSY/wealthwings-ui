import React from "react";
import { useNavigate } from "react-router-dom";
// import ThemeButton from "../components/ThemeButton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User as UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import ThemeButton from "./ThemeButton";
import { useAuth } from "@/hooks/useAuth";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-background border-b border-border">
      <div className="flex gap-4 items-baseline">
        <img
          src="/images/coin.png"
          alt="Wealth Wings Logo"
          className="w-8 h-8 object-contain"
          width={40}
          height={40}
        />
        <div className="text-xl font-bold text-foreground">Wealth Wings</div>
      </div>
      <nav>
        {user ? (
          <div className="flex items-center space-x-4">
            <ThemeButton />
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-8 w-8 cursor-pointer">
                  {user.profilePicture ? (
                    <AvatarImage src={user.profilePicture} />
                  ) : (
                    <AvatarFallback>
                      <UserIcon className="h-5 w-5" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard/settings")}
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={logout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <ThemeButton />
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/register")}>Register</Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
