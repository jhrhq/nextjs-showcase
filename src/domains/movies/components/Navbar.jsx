import Link from "next/link";
import SingInOut from "@/domains/movies/components/auth/SingInOut";
import Search from "@/domains/movies/components/landing/Search";
import NavLinks from "@/domains/movies/components/NavLinks";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-linear-to-b from-black to-transparent">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/movies" className="text-red-600 text-4xl font-bold">
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
