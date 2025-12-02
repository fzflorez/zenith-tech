"use client";

import Link from "next/link";
import { ShoppingCartComponent } from "./ShoppingCartComponent";
import { UserMenu } from "./UserMenu";
import { Button } from "../ui/button";

export function RightSideActions() {
  const user = 1;

  return (
    <div className="flex items-center">
      <ShoppingCartComponent />
      {user ? (
        <UserMenu />
      ) : (
        <Button variant="default" size="sm">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
