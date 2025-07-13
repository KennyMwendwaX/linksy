"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PageTitleContextType {
  dynamicTitle: string | null;
  setDynamicTitle: (title: string | null) => void;
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(
  undefined
);

export function PageTitleProvider({ children }: { children: ReactNode }) {
  const [dynamicTitle, setDynamicTitle] = useState<string | null>(null);

  return (
    <PageTitleContext.Provider
      value={{ dynamicTitle: dynamicTitle, setDynamicTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
}

export function usePageTitle() {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error("usePageTitle must be used within a PageTitleProvider");
  }
  return context;
}
