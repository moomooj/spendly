import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "@/constants/api";
import axios, { type AxiosResponse } from "axios";
import type { ICategory, PostICategory } from "@/types/common";

/* GET */

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

/* POST */
export async function createCategory(
  categoryData: PostICategory
): Promise<ICategory> {
  try {
    const response = await axios.post(`${API_BASE}/categories`, categoryData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create category. ${error}`);
  }
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      //after create Query going to be refresh
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
