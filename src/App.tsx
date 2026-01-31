import React from "react";
import { Nav } from "@/app/layout/Nav";
import { AppRoutes } from "@/app/routes";

export const App = () => {
  return (
    <div className="p-4">
      <Nav />
      <div className="mb-6" />
      <React.Suspense fallback={null}>
        <AppRoutes />
      </React.Suspense>
    </div>
  );
};
