
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login to Focus Links',
  description: 'Access your Focus Links member account to post in the forum, list jobs, and manage your profile.',
};

export default function LoginPage() {
  return (
    <div className="bg-brand-bg min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md rounded-3xl shadow-soft">
        <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <LogIn className="h-8 w-8 text-primary" />
            </div>
          <CardTitle className="text-3xl font-headline">Member Login</CardTitle>
          <CardDescription>
            This feature is coming soon! Login functionality will be available shortly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required disabled className="rounded-xl"/>
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-sm text-primary hover:underline pointer-events-none text-muted-foreground">
                        Forgot password?
                    </Link>
                </div>
              <Input id="password" type="password" required disabled className="rounded-xl"/>
            </div>
            <Button type="submit" className="w-full rounded-full-btn" size="lg" disabled>
              Login (Coming Soon)
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account yet?{" "}
            <Link href="/membership" className="text-primary underline font-semibold">
              Become a member
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
