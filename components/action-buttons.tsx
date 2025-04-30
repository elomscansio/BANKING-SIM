"use client";

import { ArrowDownCircle, CreditCard, Send, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
interface ActionButtonProps {
  showDeposit: () => void;
  showWithdraw: () => void;
}

export default function ActionButtons({
  showDeposit,
  showWithdraw,
}: ActionButtonProps) {
  return (
    <div className="fixed bottom-0 right-0 left-0 bg-white border-t border-gray-200 px-4 py-0">
      <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
        <Button
          variant="ghost"
          className="flex flex-col items-center py-2 h-auto text-xs border-0"
          onClick={() => {}}
        >
          <User className="h-5 w-5 mb-[5px]" />
          <span className="text-[10px]">Account</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col items-center py-2 h-auto text-xs border-0"
          onClick={showDeposit}
        >
          <ArrowDownCircle className="h-5 w-5 mb-[5px]" />
          <span className="text-[10px]">Deposit</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col items-center py-2 h-auto text-xs border-0"
          onClick={showWithdraw}
        >
          <Send className="h-5 w-5 mb-[5px]" />
          <span className="text-[10px]">Withdraw</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col items-center py-2 h-auto text-xs border-0"
          onClick={() => {
            /* alert("Card functionality would go here") */
          }}
        >
          <CreditCard className="h-5 w-5 mb-[5px]" />
          <span className="text-[10px]">Card</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col items-center py-2 h-auto text-xs border-0"
          onClick={() => {
            /* alert("Menu functionality would go here") */
          }}
        >
          <Menu className="h-5 w-5 mb-[5px]" />
          <span className="text-[10px]">Menu</span>
        </Button>
      </div>
    </div>
  );
}
