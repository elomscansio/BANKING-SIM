"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (detail: {
    amount: number;
    sender: string;
    description: string;
    date: Date;
  }) => void;
}

export default function DepositModal({
  isOpen,
  onClose,
  onDeposit,
}: DepositModalProps) {
  const [amount, setAmount] = useState("");
  const [sender, setSender] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate amount
    const depositAmount = Number.parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    onDeposit({
      amount: depositAmount,
      sender,
      description,
      date,
    });
    setAmount("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Deposit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Deposit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
