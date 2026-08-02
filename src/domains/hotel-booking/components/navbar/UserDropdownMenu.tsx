import { Building, Calendar, Menu, PlusCircle } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { AUTH_CONFIG } from "../../constants/auth.constants";
import { Button } from "../ui/button";
import Logout from "./logout";

function getInitials(name?: string | null, email?: string | null): string {
  if (name?.trim()) {
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }
  return email?.slice(0, 2).toUpperCase() || "U";
}

function UserAvatar({
  image,
  name,
  email,
  size = "size-7",
}: {
  image?: string | null;
  name?: string | null;
  email?: string | null;
  size?: string;
}) {
  return (
    <Avatar className={size}>
      <AvatarImage src={image || undefined} alt={name || "User avatar"} />
      <AvatarFallback className="bg-zinc-700 text-[11px] font-medium text-white dark:bg-zinc-300 dark:text-zinc-900">
        {getInitials(name, email)}
      </AvatarFallback>
    </Avatar>
  );
}

function AuthenticatedMenu({ user }: { user: { name?: string | null; email?: string | null; image?: string | null } }) {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel className="p-2 font-normal">
        <div className="flex items-center gap-2.5 text-left text-sm">
          <UserAvatar image={user.image} name={user.name} email={user.email} size="h-9 w-9" />
          <div className="grid flex-1 leading-tight">
            <span className="truncate font-semibold text-zinc-900 dark:text-zinc-100">{user.name || "Account"}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuItem asChild>
        <Link href={AUTH_CONFIG.ROUTES.BOOKINGS} className="flex w-full cursor-pointer items-center gap-2">
          <Calendar className="size-4 text-muted-foreground" />
          <span>My Bookings</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link href={AUTH_CONFIG.ROUTES.HOSTING_LISTING} className="flex w-full cursor-pointer items-center gap-2">
          <Building className="size-4 text-muted-foreground" />
          <span>Manage Hostings</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link href={AUTH_CONFIG.ROUTES.HOSTING_CREATE} className="flex w-full cursor-pointer items-center gap-2">
          <PlusCircle className="size-4 text-muted-foreground" />
          <span>Create New Listing</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950/50"
        asChild
      >
        <Logout />
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}

function UnauthenticatedMenu() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem asChild>
        <Link href={AUTH_CONFIG.ROUTES.SIGN_IN} className="flex w-full cursor-pointer items-center gap-2 font-medium">
          <span>Sign in</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link href={AUTH_CONFIG.ROUTES.SIGN_UP} className="flex w-full cursor-pointer items-center gap-2">
          <span>Sign up</span>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}

const UserDropdownMenu = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-center gap-3 rounded-full border border-zinc-300 bg-white px-3.5 py-1.5 text-zinc-800 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
        >
          <Menu className="size-4 text-zinc-600 dark:text-zinc-400" />
          <UserAvatar image={user?.image} name={user?.name} email={user?.email} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-56">
        {user ? <AuthenticatedMenu user={user} /> : <UnauthenticatedMenu />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdownMenu;
