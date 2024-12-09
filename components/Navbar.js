import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { title: "TOP STREAMING", id: 1 },
  { title: "GAMES ", id: 2 },
  { title: "TEAMS ", id: 3 },
];

const Navbar = () => {
  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-8">
        <Image
          height={160}
          width={500}
          src="/logo.svg"
          alt="LWS Xstream Logo"
          className="h-6"
        />
        <nav className=" hidden md:flex space-x-6">
          {navLinks.map((nav) => (
            <Link
              key={nav.id}
              href="#"
              className={cn(
                "text-gray-400 hover:text-white",
                nav.id == 1 && "font-medium text-color-purple"
              )}
            >
              {nav.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search"
            className="bg-color-gray rounded-full py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-color-purple"
          />

          <Search className="size-5 text-gray-400 absolute right-3 top-2.5" />
        </div>

        <Avatar className="w-8 h-8 rounded-full">
          <AvatarImage asChild src="/avatar.png">
            <Image
              height={160}
              width={500}
              src="/avatar.png"
              alt="User Avatar"
            />
          </AvatarImage>
          <AvatarFallback>Jo</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Navbar;
