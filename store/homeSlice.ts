import { StateCreator } from "zustand";

import { TaiwanStockInfo } from "@/api";

export interface HomeSlice {
  timeRange: number;
  setTimeRange: (timeRange: number) => void;
  stockInfo: TaiwanStockInfo | null;
  setStockInfo: (stockInfo: TaiwanStockInfo) => void;
}

export const createHomeSlice: StateCreator<HomeSlice> = (set) => ({
  timeRange: 5,
  setTimeRange: (timeRange: number) => set({ timeRange }),
  stockInfo: null,
  setStockInfo: (stockInfo: TaiwanStockInfo) => set({ stockInfo }),
})
