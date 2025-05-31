import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <PageBreadcrumb />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
