import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "@/constants/api";
import axios, { type AxiosResponse } from "axios";
import { type ITransactionGroup, type TOptions } from "@/types/common";

export async function fetchTransactions(
  type: TOptions = "all"
): Promise<ITransactionGroup[]> {
  try {
    const response: AxiosResponse<ITransactionGroup[]> = await axios.get(
      `${API_BASE}/transactions`,
      type && { params: { type } }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch transactions using Axios. ${error}`);
  }
}

export function useTransactions(type: TOptions = "all") {
  return useQuery<ITransactionGroup[], Error>({
    queryKey: ["transactions", type],
    queryFn: () => fetchTransactions(type),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
