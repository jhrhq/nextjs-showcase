import { Toaster } from "sonner";

export default async function LinkerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {" "}
      <Toaster closeButton={true} />
      {children}
    </>
  );
}
