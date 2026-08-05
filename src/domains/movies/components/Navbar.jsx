import Link from "next/link";
import SingInOut from "@/domains/movies/components/auth/SingInOut";
import Search from "@/domains/movies/components/landing/Search";
import NavLinks from "@/domains/movies/components/NavLinks";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/movies" className="text-primary text-3xl font-bold tracking-tight">
            MOVIE DB
          </Link>
          <NavLinks />
        </div>
        <div className="flex items-center gap-3">
          <Search />
          <SingInOut />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
