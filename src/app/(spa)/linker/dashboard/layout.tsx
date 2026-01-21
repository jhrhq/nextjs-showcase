export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex h-screen overflow-hidden">{children}</div>
    </main>
  );
}
