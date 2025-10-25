
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit, Settings, LogOut, CheckCircle2, UserPlus, Info, Construction } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ProfileDashboardPage() {
  
  return (
    <div className="bg-muted/40 min-h-screen py-12">
        <div className="container mx-auto max-w-2xl px-4">
            <Card>
                <CardHeader className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Construction className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-headline mt-4">Coming Soon!</CardTitle>
                    <CardDescription className="mt-1 text-base">
                      The member profile dashboard is currently under construction.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>What to Expect</AlertTitle>
                        <AlertDescription>
                            Soon, you'll be able to manage your public profile, view your activity, and access member-only settings right here.
                        </AlertDescription>
                    </Alert>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <Button size="lg" className="w-full" asChild>
                           <Link href="/">Back to Home</Link>
                        </Button>
                        <Button size="lg" className="w-full" variant="secondary" asChild>
                            <Link href="/profile/create">Create a Profile</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

    