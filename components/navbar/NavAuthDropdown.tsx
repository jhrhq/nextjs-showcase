import { auth } from "@/auth";
import Logout from "@/components/navbar/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FaBars, FaUser } from "react-icons/fa6";

const NavAuthDropdown = async () => {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center">
        <FaBars className="fas fa-bars" />
        {session ? (
          <Avatar className="size-8">
            <AvatarImage
              src={session?.user?.image}
              alt={session?.user?.name || "user avatar"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
            <FaUser className="fas fa-user text-white" />
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-2 z-50  block"
      >
        {session ? (
          <ul>
            <DropdownMenuItem asChild>
              <li className="w-full px-3 py-2 ">
                <Logout />
              </li>
            </DropdownMenuItem>
          </ul>
        ) : (
          <ul>
            <DropdownMenuItem asChild>
              <li className="w-full px-3 py-2 ">
                <Link
                  href="/login"
                  className="flex-grow text-sm text-zinc-700 transition-all  hover:pl-1 w-fll"
                >
                  Login
                </Link>
              </li>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <li className="w-full px-3 py-2 ">
                <Link
                  href="/signup"
                  className="flex-grow text-sm text-zinc-700 transition-all  hover:pl-1 w-fll"
                >
                  Signup
                </Link>
              </li>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <li className="w-full px-3 py-2 ">
                <Link
                  href="/help"
                  className="flex-grow text-sm text-zinc-700 transition-all  hover:pl-1 w-full"
                >
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
