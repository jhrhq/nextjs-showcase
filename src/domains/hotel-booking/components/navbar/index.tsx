// import LocalSwitcher from "@/domains/hotel-booking/components/navbar/LocalSwitcher";
import NavAuthDropdown from "@/domains/hotel-booking/components/navbar/NavAuthDropdown";

// import { getServerSession } from "@/lib/get-session";
import Image from "next/image";
import Link from "next/link";
import Search from "@/domains/hotel-booking/components/navbar/Search";

const Navbar = async () => {
  // const t = useTranslations("Header");
  // const me = await getServerSession();
  // console.log(me)

  return (
    <nav className="grid grid-cols-2 md:flex justify-between items-center py-3 bg-white border-b mb-6 md:gap-8 px-4 md:px-8 lg:px-20">
      <div className="flex items-center shrink-0">
        <Link href="/">
          <Image src="/hotel-booking-logo.svg" alt="Hotel Logo" height={100} width={100} className="h-8 w-auto" />
        </Link>
      </div>

      <Search />

      <div className="flex items-center space-x-4 relative justify-end">
        {/*<LocalSwitcher />*/}

        <NavAuthDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
