import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "@/constants/api";
import axios from "axios";
import { type ITransaction, type PostTransaction } from "@/types/common";

/* POST */
export async function createTransaction(
  transactionData: PostTransaction
): Promise<ITransaction> {
  try {
    const response = await axios.post(
      `${API_BASE}/transactions`,
      transactionData
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create transaction. ${error}`);
  }
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["total"] });
    },
  });
}

/* PUT */
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
}

/* DELETE */
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
}
