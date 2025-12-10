import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import Link from "next/link";
import { NavigationPanel, NavigationPanelMobile } from "./NavigationPanel";
import RightSideActions from "./RightSideActions";
import { Menu, Store } from "lucide-react";
import { DarkModeToggle } from "../DarkModeToggle";
import { getUser } from "@/src/auth/server";
import { getCartItems } from "@/src/actions/cart";

export default async function Header() {
  const user = await getUser();
  const items = await getCartItems();

  return (
    <header className="fixed top-0 z-10 w-full border-b bg-white/30 px-5 backdrop-blur-lg xl:px-0">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="text-accent-foreground flex items-center gap-3"
        >
          <Store size={24} />
          <span className="hidden text-xl font-bold sm:block">Zenith Tech</span>
        </Link>

        <div className="hidden gap-4 md:flex">
          <NavigationPanel />
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <RightSideActions user={user} items={items} />
          <DarkModeToggle />

          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu size={18} />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menú</SheetTitle>
              </SheetHeader>
              <div>
                <NavigationPanelMobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
