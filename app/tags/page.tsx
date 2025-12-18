'use client';

import { tags, workflows } from '@/data/mock';
import { Title, Text } from 'rizzui';
import Link from 'next/link';
import { Tag as TagIcon, ArrowRight } from 'lucide-react';

export default function TagsPage() {
    const tagsWithCounts = tags.map(tag => ({
        name: tag,
        count: workflows.filter(w => w.tags.includes(tag)).length
    })).sort((a, b) => b.count - a.count);

    return (
        <div className="space-y-8 py-8">
            <div className="space-y-2">
                <Title as="h1" className="text-3xl font-bold">Tags</Title>
                <Text className="text-muted-foreground">Browse workflows by category and use case.</Text>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tagsWithCounts.map((tag) => (
                    <Link key={tag.name} href={`/tags/${tag.name.toLowerCase()}`}>
                        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-all group h-full flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="p-2 w-fit rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <TagIcon className="w-5 h-5" />
                                </div>
                                <Title as="h3" className="text-lg font-bold">{tag.name}</Title>
                                <Text className="text-sm text-muted-foreground">{tag.count} Workflows</Text>
                            </div>
                            <div className="mt-6 flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                Explore <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
