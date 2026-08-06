"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AUTH_CONFIG } from "@/domains/movies/constants/auth.constant";
import { cn } from "@/lib/utils";

const navLinks = [
  { title: "Home", id: 1, link: AUTH_CONFIG.ROUTES.HOME },
  { title: "Compare Movies", id: 2, link: `${AUTH_CONFIG.ROUTES.COMPARE}` },
  { title: "Watch Later", id: 3, link: `${AUTH_CONFIG.ROUTES.WATCHLATER}` },
];

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <div className="ml-8 hidden md:flex items-center space-x-6">
      {navLinks.map((nav) => (
        <Link
          key={nav.id}
          href={nav.link}
          className={cn(
            "text-muted-foreground hover:text-foreground text-sm font-medium transition-colors pb-1 border-b-2 border-transparent",
            pathname === nav.link && "text-foreground border-primary"
          )}
        >
          {nav.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
