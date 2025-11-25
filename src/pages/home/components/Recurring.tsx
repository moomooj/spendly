import TransactionGroup from "@/components/ui/TransactionGroup";
import type { ITransactionGroup } from "@/types/common";

interface Iprops {
  data: ITransactionGroup[];
}

export default function Recurring({ data }: Iprops) {
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
