/*get */
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
  color: string;
  icon: string;
  type: "expense" | "income";
}

export interface ITransactionGroup {
  date: string;
  transactions: ITransaction[];
}

/* POST */
export interface PostICategory {
  name: string;
  icon: string;
  color: string;
  type: "expense" | "income";
}

export interface PostTransaction {
  type: "expense" | "income";
  amount: number;
  note?: string;
  date: string;
  category: number;
}

export interface Insight {
  id: number;
  name: string;
  icon: string;
  color: string;
  amount: number;
  percentage: number;
  transactionsCount: number;
  averageTransaction: number;
  transactions: ITransaction[];

  // for recharts type, index signiture
  [key: string]: string | number | ITransaction[];
}

export type Period =
  | "today"
  | "this-week"
  | "this-month"
  | "this-year"
  | "all-time";

export type InsightType = "expense" | "income" | "total";

export interface InsightSingle {
  id: number;
  name: string;
  icon: string;
  color: string;
  amount: number;
  percentage: number;
  transactionsCount: number;
  averageTransaction: number;
  transactions: ITransaction[];
  chart: ITransaction[];
}

export type TCurrency = {
  code: string;
  name: string;
  symbol: string;
};
