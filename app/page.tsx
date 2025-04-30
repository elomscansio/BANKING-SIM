"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import TransactionList from "@/components/transaction-list";
import BalanceCard from "@/components/balance-card";
import ActionButtons from "@/components/action-buttons";
import { Bell, LogOut } from "lucide-react";
import DepositModal, { DepositModalProps } from "@/components/deposit-modal";
import PaymentModal, { PaymentModalProps } from "@/components/payment-modal";

export default function Dashboard() {
  const [balance, setBalance] = useState(1250.75);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "deposit",
      amount: 500.0,
      date: "2023-04-10",
      description: "Salary deposit",
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 120.5,
      date: "2023-04-08",
      description: "Grocery shopping",
    },
    {
      id: 3,
      type: "deposit",
      amount: 200.0,
      date: "2023-04-05",
      description: "Refund",
    },
    {
      id: 4,
      type: "withdrawal",
      amount: 45.99,
      date: "2023-04-03",
      description: "Restaurant",
    },
    {
      id: 5,
      type: "withdrawal",
      amount: 350.0,
      date: "2023-04-01",
      description: "Rent payment",
    },
  ]);

  // In a real app, we would fetch data from the backend
  useEffect(() => {
    // Simulating API call to fetch balance and transactions
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        const balanceResponse = await fetch("/api/balance");
        const balanceData = await balanceResponse.json();
        setBalance(balanceData.balance);
        const transactionsResponse = await fetch("/api/transactions");
        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);

  const closeDeposit = () => setOpenDeposit(false);
  const showDeposit = () => setOpenDeposit(true);

  const closewithdraw = () => setOpenWithdraw(false);
  const showWithdraw = () => setOpenWithdraw(true);

  const onDeposit: DepositModalProps["onDeposit"] = async (detail) => {
    const balanceResponse = await fetch("/api/balance");
    alert("Deposited");
  };

  const onWithdraw: PaymentModalProps["onWithraw"] = async (detail) => {
    const balanceResponse = await fetch("/api/balance");
    alert("Withdrawal success");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#c8e7fb] font-tanseek">
      <DepositModal
        isOpen={openDeposit}
        onClose={closeDeposit}
        onDeposit={onDeposit}
      />
      <PaymentModal
        currentBalance={balance}
        isOpen={openWithdraw}
        onClose={closewithdraw}
        onWithraw={onWithdraw}
      />

      <main
        className="flex-1 container max-w-md"
        style={{ marginBottom: "61px" }}
      >
        <div className="flex justify-end items-center py-4">
          <button className="mr-4" aria-label="Notifications">
            <Bell className="h-6 w-6 text-gray-700" />
          </button>
          <button aria-label="Sign Out">
            <LogOut className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <BalanceCard balance={balance} />

        <Card
          className="mt-6 p-4"
          style={{
            marginLeft: "-16px",
            marginRight: "-16px",
            borderRadius: "30px 30px 0 0",
          }}
        >
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <TransactionList transactions={transactions} />
        </Card>
      </main>

      <ActionButtons {...{ showDeposit, showWithdraw }} />
    </div>
  );
}
