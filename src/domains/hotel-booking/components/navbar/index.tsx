import Image from "next/image";
import Link from "next/link";
import Search from "@/domains/hotel-booking/components/navbar/Search";
import UserDropdownMenu from "@/domains/hotel-booking/components/navbar/UserDropdownMenu";
import { ModeToggle } from "@/ui/shared/theme-toggle";
import { AUTH_CONFIG } from "../../constants/auth.constants";

const Navbar = async ({ showSearch }: { showSearch: boolean }) => {
  return (
    <nav className="grid grid-cols-2 md:flex justify-between items-center py-3 bg-background border-b border-border mb-6 md:gap-8 px-4 md:px-8 lg:px-20 transition-colors">
      <div className="flex items-center shrink-0">
        <Link href={AUTH_CONFIG.ROUTES.HOME}>
          <Image
            loading="eager"
            src="/hotel-booking-logo.svg"
            alt="Hotel Logo"
            height={100}
            width={100}
            className="h-8 w-auto"
          />
        </Link>
      </div>

      {showSearch && <Search />}
      <div className="flex items-center space-x-4 relative justify-end">
        <ModeToggle />
        <UserDropdownMenu />
      </div>
    </nav>
  );
};

export default Navbar;
