import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "@/constants/api";
import type { Insight, Period } from "@/types/common";
import axios from "axios";

interface InsightResponse {
  expense: Insight[];
  income: Insight[];
  total: Insight[];
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
