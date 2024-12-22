import SingInOut from "@/components/auth/SingInOut";
import Search from "@/components/landing/Search";
import Link from "next/link";

const navLinks = [
  { title: "Home", id: 1, link: "/" },
  { title: " Compare Movies ", id: 2, link: "/compare" },
  { title: "Watch Later", id: 3, link: "/watch-list" },
];

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-black to-transparent">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-red-600 text-4xl font-bold">
            MOVIE DB
          </Link>
          <div className="ml-8 space-x-4">
            {navLinks.map((nav) => (
              <Link
                key={nav.id}
                href={nav.link}
                className="text-white hover:text-gray-300"
              >
                {nav.title}
              </Link>
            ))}
          </div>
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
