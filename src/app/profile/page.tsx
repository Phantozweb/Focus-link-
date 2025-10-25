
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit, Settings, LogOut, CheckCircle2, UserPlus, Info } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const profileLinks = [
  { href: "/profile/edit", label: "Edit My Profile", icon: Edit },
  { href: "/profile/janarthan-veeramani", label: "View Public Profile", icon: User },
  { href: "/profile/settings", label: "Account Settings", icon: Settings },
];

export default function ProfileDashboardPage() {
  // Dummy user data - replace with actual logged-in user data
  // For demo purposes, we assume a user might not have a profile yet.
  const hasProfile = true; 
  const user = {
    name: 'Janarthan Veeramani',
    email: 'janarthanv@outlook.com',
    avatarUrl: 'https://iili.io/KTpEi9s.md.jpg',
    verified: true,
    membershipId: 'IN20241026123456'
  };
  
  if (!hasProfile) {
    return (
        <div className="bg-muted/40 min-h-screen py-12">
            <div className="container mx-auto max-w-2xl px-4">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <UserPlus className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-headline mt-4">Complete Your Profile</CardTitle>
                        <CardDescription className="mt-1 text-base">
                          Your membership is active, but your profile isn't live yet. Let's fix that.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>Your Membership ID</AlertTitle>
                            <AlertDescription>
                                Your ID is <strong>{user.membershipId}</strong>. You'll need this to create your public profile.
                            </AlertDescription>
                        </Alert>
                        <Button asChild size="lg" className="w-full">
                            <Link href="/profile/create">Create Your Public Profile</Link>
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            If you don't have a membership ID, please{' '}
                            <Link href="/membership" className="text-primary underline font-semibold">
                                apply here
                            </Link>.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
  }
  
  return (
    <div className="bg-muted/40 min-h-screen py-12">
        <div className="container mx-auto max-w-2xl px-4">
            <Card>
                <CardHeader className="text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-background shadow-lg">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl font-headline flex items-center justify-center gap-2">
                        {user.name}
                        {user.verified && <CheckCircle2 className="h-7 w-7 text-primary" />}
                    </CardTitle>
                    <CardDescription className="text-base">{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Separator />
                    <ul className="space-y-2">
                        {profileLinks.map(link => (
                            <li key={link.href}>
                                <Button variant="ghost" asChild className="w-full justify-start text-base py-6">
                                    <Link href="#">
                                        <link.icon className="mr-3 h-5 w-5 text-muted-foreground" />
                                        {link.label}
                                    </Link>
                                </Button>
                            </li>
                        ))}
                         <li>
                            <Button variant="ghost" className="w-full justify-start text-base py-6 text-destructive hover:text-destructive">
                                <LogOut className="mr-3 h-5 w-5" />
                                Logout
                            </Button>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
