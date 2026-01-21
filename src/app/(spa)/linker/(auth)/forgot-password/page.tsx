import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center h-dvh">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Reset Password </CardTitle>
            <CardDescription>Reset your password</CardDescription>
            <CardAction>
              <Button variant="link" asChild>
                <Link href="/linker">Go to Linker Login</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
