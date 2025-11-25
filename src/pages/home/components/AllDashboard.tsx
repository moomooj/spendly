import TransactionGroup from "@/components/ui/TransactionGroup";
import Total from "./Total";
import type { ITransactionGroup } from "@/types/common";

interface Iprops {
  data: ITransactionGroup[];
}

export default function AllDashboard({ data }: Iprops) {
  return (
    <>
      <Total />
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
