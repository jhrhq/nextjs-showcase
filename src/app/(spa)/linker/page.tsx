"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function page() {
  return (
    <div>
      <div className="container mx-auto p-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl text-slate-900">TODO</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre
              className="p-4 bg-slate-300 wrap-break-word whitespace-pre-wrap
"
            >
              In this app, there will be no home page. Just authentication page(signin, singup, forgot-password) and
              dashboard.
            </pre>
          </CardContent>
        </Card>
      </div>
      <div className="h-svh flex items-center justify-center">
        <Spinner className="size-10" />
      </div>
    </div>
  );
}
