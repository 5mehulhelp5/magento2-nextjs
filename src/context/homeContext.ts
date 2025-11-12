"use client";
import { createContext } from "react";
import { CmsPage } from "@/container";

interface HomeContextType {
  cmsPageContent: CmsPage | null;
  storeConfig?: any; // Store configuration from useStoreConfig hook
}

const contextData: HomeContextType = {
  cmsPageContent: null,
  storeConfig: undefined,
};

export const HomeContext = createContext<HomeContextType>(contextData);
