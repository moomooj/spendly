import type { TCurrency } from "@/types/common";
import { create } from "zustand";

interface CurrencyState {
  selectedCurrency: TCurrency;
  setSelectedCurrency: (currency: TCurrency) => void;
}

const useCurrencyStore = create<CurrencyState>((set) => ({
  selectedCurrency: { code: "USD", name: "United States Dollar", symbol: "$" },
  setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
}));

export default useCurrencyStore;
