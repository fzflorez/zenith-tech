"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { UserMenu } from "./user-menu";
import { ShoppingCartComponent } from "./shopping-cart-component";

export const RightSideActions = () => {
  const user = 1;

  return (
    <div className="flex items-center">
      <ShoppingCartComponent />
      {user ? (
        <UserMenu user={user} />
      ) : (
        <Button variant="default" size="sm">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
};
