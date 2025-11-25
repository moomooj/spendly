import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import { API_BASE } from "@/constants/api";
import type { Period } from "@/types/common";

export interface ITotal {
  total: number;
}

export async function fetchTotal(period: Period): Promise<ITotal> {
  try {
    const response: AxiosResponse<ITotal> = await axios.get(
      `${API_BASE}/total`,
      {
        params: { period },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch total for period ${period}. ${error}`);
  }
}

export function useTotal(period: Period) {
  return useQuery<ITotal, Error>({
    queryKey: ["total", period],
    queryFn: () => fetchTotal(period),
    staleTime: 1000 * 60, // 1 minut
  });
}
