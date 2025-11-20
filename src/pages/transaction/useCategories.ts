import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "@/constants/api";
import axios, { type AxiosResponse } from "axios";

export interface ICategory {
  _id: string;
  id: number;
  name: string;
  note?: string;
  color: string;
  icon: string;
  type: "expense" | "income";
}

export async function fetchCategories(): Promise<ICategory[]> {
  try {
    const response: AxiosResponse<ICategory[]> = await axios.get(
      `${API_BASE}/categories`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch categories using Axios. ${error}`);
  }
}

export function useCategories() {
  return useQuery<ICategory[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,

    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
