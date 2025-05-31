import React, { Suspense } from "react";
import { BrowserRouter, useRoutes, RouteObject } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import { Toaster } from "sonner";
import Layout from "./components/layout/Layout";
import { appRoutes } from "./routes/appRoutes";

function AppRoutes() {
  // Helper to wrap lazy elements in Suspense
  function wrapLazy(element: any) {
    return (
      <Suspense fallback={<Loader />}>
        {React.createElement(element)}
      </Suspense>
    );
  }
  function mapRoutes(routes: any[]): RouteObject[] {
    return routes.map((route) => {
      const { path, element, children, index } = route;
      return {
        path,
        index,
        element: element ? wrapLazy(element) : undefined,
        children: children ? mapRoutes(children) : undefined,
      };
    });
  }
  return useRoutes(mapRoutes(appRoutes));
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
        <Toaster position="top-right" />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
