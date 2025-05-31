import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const ProfileButton = () => {
  const { user, logout } = useAuth();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="flex items-center gap-2">
        <User className="h-5 w-5" />
        <span>{user.name || user.email}</span>
      </button>
      {isDropdownVisible && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LogOut className="inline-block mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
