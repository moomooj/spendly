import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "@/constants/api";
import axios, { type AxiosResponse } from "axios";

export interface ITransaction {
  _id: string;
  id: number;
  type: "expense" | "income";
  amount: number;
  note?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  categories?: { id: number; name: string };
}

export async function fetchTransactions(): Promise<ITransaction[]> {
  try {
    const response: AxiosResponse<ITransaction[]> = await axios.get(
      `${API_BASE}/transactions`
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch transactions using Axios. ${error}`);
  }
}

export function useTransactions() {
  return useQuery<ITransaction[], Error>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
