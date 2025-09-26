import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export function PageBreadcrumb() {
  const location = useLocation();
  const { pathname } = location;

  // Skip breadcrumb on main dashboard
  if (pathname === "/dashboard") {
    return null;
  }

  // Split the path into segments
  const segments = pathname.split("/").filter(Boolean);

  // Create breadcrumb items
  const breadcrumbItems = segments.map((segment: string, index: number) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;

    // Format the segment for display (capitalize and replace hyphens with spaces)
    const formattedSegment = segment
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      href,
      label: formattedSegment,
      isLast,
    };
  });

  return (
    <Breadcrumb className="m-6 hidden md:block">
      <BreadcrumbList>
        {breadcrumbItems.map((item: { href: string; label: string; isLast: boolean }) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
