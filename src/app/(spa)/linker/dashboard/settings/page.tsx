import { CreditCard, Link, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className=" min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Header */}
      <div className="space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings, workspace preferences, and billing.</p>
      </div>
      <Separator />

      {/* Settings Navigation Tabs */}
      <Tabs
        defaultValue="account"
        className="animate-in fade-in slide-in-from-bottom-2 flex-none duration-300  mt-4 space-y-6"
      >
        <TabsList className="border-b p-0 w-full rounded-none inline-block group-data-[orientation=horizontal]/tabs:h-fit space-x-2.5 ">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="billing">Billing & Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card className="bg-card text-card-foreground border-muted">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your personal information and public profile avatar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-muted text-lg">MU</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    defaultValue="mock user"
                    className="bg-background border-input focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    defaultValue="m@example.com"
                    className="bg-background border-input focus-visible:ring-primary"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 px-6 py-4 justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card className="bg-card text-card-foreground border-muted">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Keep your account secure by enabling key security features.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg bg-background/50">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium">Two-Factor Authentication</span>
                  <span className="text-xs text-muted-foreground">
                    Secure your account with an authentication app code.
                  </span>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-card text-card-foreground border-muted">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Plan</CardTitle>
                <CreditCard className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">Pro Scale Plan</div>
                <p className="text-xs text-muted-foreground mt-1">Renews on June 20, 2026</p>
              </CardContent>
            </Card>

            <Card className="bg-card text-card-foreground border-muted">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Links Created</CardTitle>
                <Link className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,185</div>
                <p className="text-xs text-muted-foreground mt-1">of 5,000 monthly allowance</p>
                <div className="w-full bg-muted h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "43.7%" }} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card text-card-foreground border-muted">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Team Seats</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1 / 5</div>
                <p className="text-xs text-muted-foreground mt-1">Seats occupied in workspace</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
