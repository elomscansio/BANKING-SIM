import { DollarSign } from "lucide-react";

interface BalanceCardProps {
  balance: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Available Balance</p>
          <h2 className="text-3xl font-bold">${balance?.toFixed(2) || 0}</h2>
          <p className="text-sm text-gray-500 mt-1">
            BUSINESS CHECKING ...1421
          </p>
        </div>
        <div className="bg-primary/10 p-3 rounded-full">
          <DollarSign className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
