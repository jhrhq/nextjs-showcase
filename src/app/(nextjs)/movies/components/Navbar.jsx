import SingInOut from "@/components/auth/SingInOut";
import Search from "@/components/landing/Search";
import NavLinks from "@/components/NavLinks";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-black to-transparent">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-red-600 text-4xl font-bold">
            MOVIE DB
          </Link>
          <NavLinks />
        </div>
        <div className="flex items-center gap-2">
          <Search />
          <SingInOut />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
