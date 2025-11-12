"use client";
import { combineComponents } from "@/utils/combineComponents";
import {
  AppContextProvider,
  CartContextProvider
} from "@/context";
import { StoreConfigProvider } from "@/hooks/useStoreConfig";

// Combine all context providers
// Note: combineComponents accepts any number of providers that accept { children: ReactNode }
export const RootContextProvider = combineComponents(
  AppContextProvider,
  CartContextProvider,
  StoreConfigProvider
);
