import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "@/constants/api";
import type { Period } from "@/types/common";
import axios from "axios";

interface Insight {
  id: number;
  name: string;
  icon: string;
  color: string;
  amount: number;
  percentage: number;
  transactionsCount: number;
  averageTransaction: number;

  // for recharts type, index signiture
  [key: string]: string | number;
}

interface InsightResponse {
  expense: Insight[];
  income: Insight[];
}

//GET
const fetchInsights = async (period: Period): Promise<InsightResponse> => {
  const { data } = await axios.get<InsightResponse>(`${API_BASE}/insights`, {
    params: { period },
  });
  return data;
};

export const useInsights = (period: Period = "this-month") => {
  const {
    data,
    isLoading: loading,
    isError,
    error,
  } = useQuery<InsightResponse, Error>({
    queryKey: ["insights", period],
    queryFn: () => fetchInsights(period),
  });

  return { data: data, loading, error: isError ? error.message : null };
};
