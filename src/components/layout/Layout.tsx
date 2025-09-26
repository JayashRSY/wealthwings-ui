import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import DynamicMobileHeader from './DynamicMobileHeader';
import MobileNavModal from './MobileNavModal';
import MobileBottomNav from './MobileBottomNav';
import { useAuth } from '@/hooks/useAuth';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { user } = useAuth();

  const handleMobileMenuToggle = () => {
    if (user) {
      setIsMobileNavOpen(!isMobileNavOpen);
    }
  };

  const handleMobileMenuClose = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className="flex min-h-screen overflow-hidden md:overflow-visible">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile Navigation Modal */}
      <MobileNavModal 
        isOpen={isMobileNavOpen} 
        onClose={handleMobileMenuClose} 
      />
      
      <div className="flex flex-col flex-1 w-full overflow-hidden md:overflow-visible mobile-container ios-fix">
        {/* Desktop Navbar - Hidden on mobile */}
        <div className="hidden md:block">
          <Navbar />
        </div>
        
        {/* Mobile Header - Hidden on desktop, only show when user is logged in */}
        {user && <DynamicMobileHeader onMenuClick={handleMobileMenuToggle} />}
        
        <main className={user ? "flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide mb-16 md:mb-0 pt-16 md:pt-0" : "flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide md:pt-0"}>
          {children}
        </main>
        
        {/* Mobile Bottom Navigation - only show when user is logged in */}
        {user && <MobileBottomNav onMoreClick={handleMobileMenuToggle} />}
      </div>
    </div>
  );
};

export default Layout;
