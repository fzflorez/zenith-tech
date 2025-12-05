"use client";

import Link from "next/link";
import ShoppingCartComponent from "./ShoppingCartComponent";
import UserMenu from "./UserMenu";
import { Button } from "../ui/button";
import { User } from "@supabase/supabase-js";

type Props = {
  user: User | null;
};

export default function RightSideActions({ user }: Props) {
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
}
