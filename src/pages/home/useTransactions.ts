import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "@/constants/api";
import axios, { type AxiosResponse } from "axios";
import { type ITransaction, type PostTransaction } from "@/types/common";

export interface ITransactionGroup {
  date: string;
  transactions: ITransaction[];
}

export async function fetchTransactions(): Promise<ITransactionGroup[]> {
  try {
    const response: AxiosResponse<ITransactionGroup[]> = await axios.get(
      `${API_BASE}/transactions/grouped`
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch transactions using Axios. ${error}`);
  }
}

export function useTransactions() {
  return useQuery<ITransactionGroup[], Error>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}

/* POST - 거래 생성 */
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
      // 성공 시, 거래 내역과 총액을 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["total"] });
    },
  });
}

/* PUT - 거래 수정 */
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
      // 성공 시, 거래 내역과 총액을 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["total"] });
    },
  });
}
