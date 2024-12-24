"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { title: "Home", id: 1, link: "/" },
  { title: " Compare Movies ", id: 2, link: "/compare" },
  { title: "Watch Later", id: 3, link: "/watchlater" },
];

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <div className="ml-8 space-x-4">
      {navLinks.map((nav) => (
        <Link
          key={nav.id}
          href={nav.link}
          className={cn(
            "text-white hover:text-gray-300",
            pathname == nav.link && " font-medium border-b border-b-red-600"
          )}
        >
          {nav.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
