import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

const DashboardLayout = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!user) {
    // Show a toast notification to inform the user
    toast.error("Please log in to access this page");
    
    // Redirect to login while preserving the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <>
      <PageBreadcrumb />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
