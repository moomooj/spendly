export type Period =
  | "today"
  | "this-week"
  | "this-month"
  | "this-year"
  | "all-time";

export type InsightType = "expense" | "income" | "total";

export type IType = "expense" | "income" | "recurring";
export type IRecurring = "days" | "weeks" | "months" | "custom";

export type TOptions =
  | "all"
  | "expense"
  | "income"
  | "category"
  | "recurring"
  | "upcoming"
  | "by-day"
  | "by-week"
  | "by-month"
  | "by-year";

/*get */
export interface ITransaction {
  _id: string;
  id: number;
  type: IType;
  amount: number;
  note?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
  recurring?: IRecurring;
  endDate?: Date;
  customNumber?: number;
}

export interface ICategory {
  _id: string;
  id: number;
  name: string;
  color: string;
  icon: string;
  type: IType;
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
  type: IType;
}

export interface PostTransaction {
  type: IType;
  amount: number;
  note?: string;
  date: string;
  category: number;
  recurring?: IRecurring;
  customNumber?: number;
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
