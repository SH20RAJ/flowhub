'use client';

import Link from 'next/link';
import { Title, Text, Button } from 'rizzui';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center animate-in fade-in zoom-in duration-500">
            <div className="p-6 rounded-3xl bg-muted/20 mb-8 text-muted-foreground/30 ring-12 ring-muted/5">
                <FileQuestion className="w-16 h-16" />
            </div>
            <div className="space-y-4 max-w-md">
                <Title as="h1" className="text-4xl md:text-5xl font-black tracking-tighter">
                    404 - Lost in Flow
                </Title>
                <Text className="text-xl text-muted-foreground font-medium leading-relaxed">
                    The page or workflow you are looking for has been moved or doesn&apos;t exist in our hub.
                </Text>
            </div>
            <div className="flex gap-4 mt-12">
                <Link href={ROUTES.HOME}>
                    <Button size="lg" className="rounded-xl px-10 h-14 font-black uppercase tracking-widest transition-transform hover:scale-105 shadow-2xl shadow-primary/20">
                        Go Home
                    </Button>
                </Link>
                <Link href={ROUTES.WORKFLOWS}>
                    <Button size="lg" variant="outline" className="rounded-xl px-10 h-14 font-black uppercase tracking-widest border-muted/50 hover:border-primary/50 gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        All Workflows
                    </Button>
                </Link>
            </div>
        </div>
    );
}
