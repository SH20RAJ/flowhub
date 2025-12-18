'use client';

import { tags, workflows } from '@/data/mock';
import { Title, Text } from 'rizzui';
import Link from 'next/link';
import { Tag as TagIcon, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { slugify } from '@/utils/slug';

export default function TagsPage() {
    const tagsWithCounts = tags.map(tag => ({
        name: tag,
        count: workflows.filter(w => w.tags.includes(tag)).length
    })).sort((a, b) => b.count - a.count);

    return (
        <div className="space-y-12 py-4 animate-in fade-in duration-700">
            <div className="space-y-3 max-w-2xl">
                <Title as="h1" className="text-4xl font-black tracking-tighter">Directory Tags</Title>
                <Text className="text-muted-foreground text-lg font-medium leading-relaxed">
                    Explore our collection of automations sorted by industry, tool, and specific use case.
                </Text>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tagsWithCounts.map((tag) => (
                    <Link key={tag.name} href={ROUTES.TAG_DETAIL(slugify(tag.name))} className="group">
                        <div className="p-8 border-2 border-muted/30 rounded-3xl bg-card/30 backdrop-blur-sm shadow-sm hover:border-primary/50 transition-all group-hover:shadow-xl group-hover:shadow-primary/5 h-full flex flex-col justify-between overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

                            <div className="space-y-5 relative z-10">
                                <div className="p-3 w-fit rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner">
                                    <TagIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <Title as="h3" className="text-xl font-black tracking-tight">{tag.name}</Title>
                                    <Text className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-70">
                                        {tag.count} Workflows
                                    </Text>
                                </div>
                            </div>
                            <div className="mt-10 flex items-center text-xs font-black uppercase tracking-[0.2em] text-primary translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                Browse Flows <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
