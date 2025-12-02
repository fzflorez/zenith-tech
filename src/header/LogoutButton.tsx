"use client";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

export const LogOutButton = () => {
  return (
    <DropdownMenuItem className="text-destructive flex cursor-pointer items-center gap-2">
      <LogOut className="text-primary h-4 w-4" />
      Salir
    </DropdownMenuItem>
  );
};
