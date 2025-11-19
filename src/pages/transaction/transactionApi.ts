import axios from "axios";
import { API_BASE } from "@/constants/api";

export interface TransactionData {
  type: "expense" | "income";
  amount: number;
  note: string;
  date: Date;
}

const API_URL = `${API_BASE}/transactions`;

export const createTransaction = async (data: TransactionData) => {
  try {
    const response = await axios.post(API_URL, data);

    console.log("Transaction created successfully:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to create transaction:", error.response.data);
      throw new Error(error.response.data.message || "Transaction failed");
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("Network error or unexpected failure");
    }
  }
};
