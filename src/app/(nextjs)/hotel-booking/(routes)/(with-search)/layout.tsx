import Navbar from "@/domains/hotel-booking/components/navbar";

export default function SearchableLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar showSearch={true} />
      <main>{children}</main>
    </>
  );
}
