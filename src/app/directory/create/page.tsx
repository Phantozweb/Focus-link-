
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CreateProfilePage() {
    return (
        <div className="bg-muted/40">
            <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
                <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Create Your Professional Profile</h1>
                <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                    Let our AI help you build a standout profile for the eye care community. Choose your preferred method below.
                </p>
                </div>
            </section>

            <div className="container mx-auto max-w-4xl py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <Bot className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle className="text-center">AI Interview Chat</CardTitle>
                            <CardDescription className="text-center">
                                Have a natural conversation with our AI assistant. It will ask you questions one by one to build your profile.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-end">
                            <Button asChild className="w-full">
                                <Link href="/directory/create/chat">Start Chat Interview <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </CardContent>
                    </Card>

                     <Card className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <FileText className="h-12 w-12 text-primary" />
                            </div>
                            <CardTitle className="text-center">AI Profile Builder</CardTitle>
                            <CardDescription className="text-center">
                                Paste your existing resume, bio, or just write about yourself. Our AI will parse it and create a structured profile for you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-end">
                             <Button asChild className="w-full">
                                <Link href="/directory/create/from-text">Use Text Builder <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
