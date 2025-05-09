import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface Transaction {
  id: number;
  type: "deposit" | "withdrawal";
  amount: number;
  date: string;
  description: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-4 rounded-lg p-4 shadow-sm">
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No transactions found</p>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-2 border-b border-gray-100"
          >
            <div className="flex items-center">
              <div
                className={`p-2 rounded-full mr-3 ${
                  transaction.type === "deposit" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {transaction.type === "deposit" ? (
                  <ArrowDownCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <ArrowUpCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            <div
              className={`font-semibold ${
                transaction.type === "deposit"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type === "deposit" ? "+" : "-"}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(transaction.amount)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
