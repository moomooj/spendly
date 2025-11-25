import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "@/constants/api";
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
  [key: string]: any;
}

interface InsightResponse {
  expense: Insight[];
  income: Insight[];
}

export type InsightType = "expense" | "income";

//GET
const fetchInsights = async (): Promise<InsightResponse> => {
  const { data } = await axios.get<InsightResponse>(`${API_BASE}/insights`);
  return data;
};

export const useInsights = (type: InsightType = "expense") => {
  const {
    data,
    isLoading: loading,
    isError,
    error,
  } = useQuery<InsightResponse, Error>({
    queryKey: ["insights"],
    queryFn: fetchInsights,
  });

  return { data: data?.[type], loading, error: isError ? error.message : null };
};
