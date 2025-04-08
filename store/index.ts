import { create } from "zustand";
import { persist } from 'zustand/middleware';

import { createHomeSlice, HomeSlice } from "./homeSlice";

type StoreState = HomeSlice

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createHomeSlice(...a),
    }),
    { name: 'stark-tech-test-store' }
  )
)
