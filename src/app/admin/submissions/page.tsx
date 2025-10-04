
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ShieldCheck, UserCheck, UserX, Users } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';

// Simplified Member type for the admin page
type Member = {
    id: string;
    name: string;
    email: string;
    role: string;
    country: string;
    verified: boolean;
};


export default function AdminDashboardPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    if (isAuthenticated !== 'true') {
      router.replace('/admin');
      return;
    }

    async function fetchMembers() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/members');
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        } else {
          toast({ variant: 'destructive', title: 'Failed to load members.' });
        }
      } catch (error) {
        toast({ variant: 'destructive', title: 'An error occurred while fetching members.' });
      } finally {
        setIsLoading(false);
      }
    }

    fetchMembers();
  }, [router, toast]);


  const handleVerification = async (memberId: string, shouldVerify: boolean) => {
    setIsProcessing(memberId);
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, action: shouldVerify ? 'verify' : 'unverify' }),
      });

      if (response.ok) {
        setMembers(prev => prev.map(m => m.id === memberId ? { ...m, verified: shouldVerify } : m));
        toast({
          title: `Member ${shouldVerify ? 'Verified' : 'Unverified'}`,
        });
      } else {
        const errorData = await response.json();
        toast({ variant: 'destructive', title: 'Action Failed', description: errorData.message });
      }
    } catch (error) {
       toast({ variant: 'destructive', title: 'An error occurred.' });
    } finally {
      setIsProcessing(null);
    }
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    router.replace('/admin');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  }

  if (isLoading && !members.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    Admin Dashboard
                </CardTitle>
                <CardDescription>
                    View registered members and manage profile verifications. Total members: {members.length}.
                </CardDescription>
            </div>
            <Button onClick={handleLogout} variant="outline">Logout</Button>
          </CardHeader>
          <CardContent>
            {members.length > 0 ? (
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-mono text-xs">{member.id}</TableCell>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.country}</TableCell>
                      <TableCell>
                        <Badge variant={member.verified ? "default" : "secondary"}>
                            {member.verified ? "Verified" : "Not Verified"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {member.verified ? (
                            <Button
                                onClick={() => handleVerification(member.id, false)}
                                disabled={isProcessing === member.id}
                                variant="destructive"
                                size="sm"
                            >
                                {isProcessing === member.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserX className="mr-2 h-4 w-4" />}
                                Unverify
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handleVerification(member.id, true)}
                                disabled={isProcessing === member.id}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {isProcessing === member.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserCheck className="mr-2 h-4 w-4" />}
                                Verify
                            </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">No members have joined yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
