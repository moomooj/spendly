export default function Dashboard() {
  const total = 30000;
  return (
    <h1 className="text-center text-xl font-semibold mb-6">
      Total:{" "}
      <span
        className={`${total < 0 ? "text-red-500" : "text-green-500"} font-bold`}
      >
        ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </span>
    </h1>
  );
}
