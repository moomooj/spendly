import Total from "@/pages/home/Total";
import TransactionGroup from "@/components/ui/TransactionGroup";
import groupedData from "@/data/dummy.json";

export default function Dashboard() {
  return (
    <div className="p-5 bg-white min-h-screen text-gray-800">
      <Total />

      <div className="space-y-6">
        {groupedData.map((group) => (
          <TransactionGroup
            key={group.date}
            date={group.date}
            transactions={group.transactions}
          />
        ))}
      </div>
    </div>
  );
}
