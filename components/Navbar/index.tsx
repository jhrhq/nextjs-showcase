import NavAuthDropdown from "@/components/Navbar/NavAuthDropdown";
import Search from "@/components/Navbar/Search";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { FaLanguage } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="grid grid-cols-2 md:flex justify-between items-center py-3 bg-white border-b mb-6 md:gap-8 px-4 md:px-8 lg:px-20">
      <div className="flex items-center shrink-0">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Hotel Logo"
            height={100}
            width={100}
            className="h-8 w-auto"
          />
        </Link>
      </div>

      <Search />

      <div className="flex items-center space-x-4 relative justify-end">
        <Button className=" rounded-full px-3" variant="outline">
          <FaLanguage className="fas fa-language text-zinc-700 text-xl" />
        </Button>

        <NavAuthDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
