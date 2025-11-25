import TransactionGroup from "@/components/ui/TransactionGroup";
import type { ITransactionGroup } from "@/types/common";

interface Iprops {
  byDate: "by-day" | "by-week" | "by-month" | "by-year";
  data: ITransactionGroup[];
}

export default function ByDate({ data }: Iprops) {
  return (
    <>
      {data.map((group) => (
        <TransactionGroup
          key={group.date}
          date={group.date}
          transactions={group.transactions}
        />
      ))}
    </>
  );
}
