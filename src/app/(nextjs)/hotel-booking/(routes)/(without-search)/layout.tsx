import Navbar from "@/domains/hotel-booking/components/navbar";

export default function StandardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar showSearch={false} />
      <main>{children}</main>
    </>
  );
}
