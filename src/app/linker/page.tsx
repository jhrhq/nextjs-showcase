import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center h-dvh">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Welcome to, Linker </CardTitle>
            <CardDescription>Link Building App</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
