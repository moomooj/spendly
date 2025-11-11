import { API_BASE } from "@/constants/api";

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
  const res = await fetch(`${API_BASE}/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}
