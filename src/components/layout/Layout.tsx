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
      {/* Desktop Sidebar - Hidden on mobile, now sticky */}
      <div className="hidden md:block md:sticky md:top-0 md:h-screen">
        <Sidebar />
      </div>
      
      {/* Mobile Navigation Modal */}
      <MobileNavModal 
        isOpen={isMobileNavOpen} 
        onClose={handleMobileMenuClose} 
      />
      
      <div className="flex flex-col flex-1 w-full overflow-hidden md:overflow-visible mobile-container ios-fix">
        {/* Desktop Navbar - Hidden on mobile, now sticky */}
        <div className="hidden md:block md:sticky md:top-0 md:z-10">
          <Navbar />
        </div>
        
        {/* Mobile Header - Hidden on desktop, only show when user is logged in, now sticky */}
        {user && (
          <div className="sticky top-0 z-10">
            <DynamicMobileHeader onMenuClick={handleMobileMenuToggle} />
          </div>
        )}
        
        <main className={user ? "flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide mb-20 md:mb-0 pt-16 md:pt-0 ios-safe-bottom" : "flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide md:pt-0"}>
          {children}
        </main>
        
        {/* Mobile Bottom Navigation - only show when user is logged in, already sticky by default */}
        {user && <MobileBottomNav onMoreClick={handleMobileMenuToggle} />}
      </div>
    </div>
  );
};

export default Layout;
