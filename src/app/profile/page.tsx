
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit, Settings, LogOut, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const profileLinks = [
  { href: "/profile/edit", label: "Edit My Profile", icon: Edit },
  { href: "/profile/janarthan-veeramani", label: "View Public Profile", icon: User },
  { href: "/profile/settings", label: "Account Settings", icon: Settings },
];

export default function ProfileDashboardPage() {
  // Dummy user data - replace with actual logged-in user data
  const user = {
    name: 'Janarthan Veeramani',
    email: 'janarthanv@outlook.com',
    avatarUrl: 'https://iili.io/KTpEi9s.md.jpg',
    verified: true,
  };
  
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
