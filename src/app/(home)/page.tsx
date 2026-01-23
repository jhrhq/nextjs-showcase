import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Multi-App Platform</h1>
          <p className="text-muted-foreground">Choose an application to get started</p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Linker SPA Application</CardTitle>
              <CardDescription>Client-side rendered app with full SPA features</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/linker">
                <Button className="w-full">Open Linker</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blog</CardTitle>
              <CardDescription>Server-rendered Next.js application</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/blog">
                <Button variant="secondary" className="w-full">
                  Visit Blog
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
