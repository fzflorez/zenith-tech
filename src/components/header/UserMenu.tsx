import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogOutButton from "./LogoutButton";

type Props = {
  user: User | null;
};

export default function UserMenu({ user }: Props) {
  const fullName = user?.user_metadata.fullName;
  const email = user?.user_metadata.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="focus:bg-accent flex items-center gap-2 p-0 "
        >
          <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
            {fullName.charAt(0).toUpperCase()}
          </div>
          <span className="text-accent-foreground hidden text-base sm:block">
            {fullName.split(" ")[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-base font-semibold">{fullName}</p>
          <p className="text-muted-foreground text-sm">{email}</p>
        </div>
        <DropdownMenuSeparator />
        <LogOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
