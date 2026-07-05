import { Bell, CreditCard, LogOut, Menu, User, UserCircle } from "lucide-react";
import Link from "next/link";
import Logout from "@/domains/hotel-booking/components/navbar/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/domains/hotel-booking/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/domains/hotel-booking/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers"

const NavAuthDropdown = async () => {
  const session = await auth.api.getSession({
         headers: await headers()
     })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center">
        <Menu className="fas fa-bars" />
        {session ? (
          <Avatar className="size-8">
            <AvatarImage src={session.user?.image} alt={session.user?.name || "user avatar"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
            <User className="fas fa-user text-white" />
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-2 z-50 block"
      >
        {session ? (
          <>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={session?.user?.image} alt={session?.user.name} />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
            </Avatar>
                       <div className="grid flex-1 text-left text-sm leading-tight">
                         <span className="truncate font-medium">{session?.user.name}</span>
                         <span className="truncate text-xs text-muted-foreground">
                           {session?.user.email}
                         </span>
                       </div>
                     </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <UserCircle />
                        Account
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard />
                        Billing
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell />
                        Notifications
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
<Logout />
                    </DropdownMenuItem>
          </>
        ) : (
          <ul>
            <DropdownMenuItem asChild>
              <li className="w-full px-3 py-2 ">
                <Link href="/hotel-booking/signin" className="grow text-sm text-zinc-700 transition-all  hover:pl-1 w-fll">
                  Signin
                </Link>
              </li>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <li className="w-full px-3 py-2 ">
                <Link href="/hotel-booking/signup" className="grow text-sm text-zinc-700 transition-all  hover:pl-1 w-fll">
                  Signup
                </Link>
              </li>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <li className="w-full px-3 py-2 ">
                <Link href="/hotel-booking/help" className="grow text-sm text-zinc-700 transition-all  hover:pl-1 w-full">
                  Help
                </Link>
              </li>
            </DropdownMenuItem>
          </ul>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavAuthDropdown;
