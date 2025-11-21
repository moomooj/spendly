export interface ITransaction {
  _id: string;
  id: number;
  type: "expense" | "income";
  amount: number;
  note?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
}

export interface ICategory {
  _id: string;
  id: number;
  name: string;
  note?: string;
  color: string;
  icon: string;
  type: "expense" | "income";
}

export interface ITransactionGroup {
  date: string;
  transactions: ITransaction[];
}
