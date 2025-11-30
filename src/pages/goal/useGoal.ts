import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "@/constants/api";
import axios from "axios";
import { type IGoal, type IGoalGET, type IGoalPost } from "@/types/common";

/* GET */
export async function getGoals(): Promise<IGoalGET[]> {
  try {
    const response = await axios.get(`${API_BASE}/goal`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch goals. ${error}`);
  }
}

export function useGoals() {
  return useQuery({
    queryKey: ["goals"],
    queryFn: getGoals,
  });
}

/* POST */
export async function createGoal(goalData: IGoalPost): Promise<IGoal> {
  try {
    const response = await axios.post(`${API_BASE}/goal`, goalData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create goal. ${error}`);
  }
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
}

/* PUT 
interface UpdateTransactionPayload {
  id: string;
  data: PostTransaction;
}

export async function updateTransaction({
  id,
  data,
}: UpdateTransactionPayload): Promise<ITransaction> {
  const response = await axios.put(`${API_BASE}/transactions/${id}`, data);
  return response.data;
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["total"] });
    },
  });
}*/

/* DELETE 
export async function deleteTransaction(id: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE}/transactions/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete transaction. ${error}`);
  }
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["total"] });
    },
  });
}*/
