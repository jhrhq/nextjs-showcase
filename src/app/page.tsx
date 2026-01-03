export default function Page() {
  return <>{CardDemo()}</>;
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardDemo() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center h-dvh">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Working on Linker App</CardTitle>
            <CardDescription>Link Building App</CardDescription>
            <CardAction>
              <Button variant="link">
                <Link href="/linker">Go to Linker App</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
