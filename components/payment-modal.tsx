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

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithraw: (detail: {
    amount: number;
    recipient: string;
    description: string;
    date: string;
  }) => void;
  currentBalance: number;
}

export default function PaymentModal({
  isOpen,
  onClose,
  onWithraw: onPay,
  currentBalance,
}: PaymentModalProps) {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate recipient
    if (!recipient.trim()) {
      setError("Please enter a recipient");
      return;
    }

    // Validate amount
    const paymentAmount = Number.parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    // Check if sufficient balance
    if (paymentAmount > currentBalance) {
      setError("Insufficient balance");
      return;
    }

    onPay({
      amount: paymentAmount,
      recipient,
      description,
      date,
    });
    setRecipient("");
    setAmount("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Payment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2 my-2">
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
            <div className="grid gap-2 my-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="Enter Recipient Name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="grid gap-2 my-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2 my-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                placeholder="Enter Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="my-2"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button className="my-2" type="submit">Pay</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
