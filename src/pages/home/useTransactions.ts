import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "@/constants/api";
import axios, { type AxiosResponse } from "axios";
import { type ITransactionGroup } from "@/types/common";

export async function fetchTransactions(): Promise<ITransactionGroup[]> {
  try {
    const response: AxiosResponse<ITransactionGroup[]> = await axios.get(
      `${API_BASE}/transactions`
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch transactions using Axios. ${error}`);
  }
}

export function useTransactions() {
  return useQuery<ITransactionGroup[], Error>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
