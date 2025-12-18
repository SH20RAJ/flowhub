'use client';

import { useState, useMemo } from 'react';
import { Title, Text } from 'rizzui';
import Link from 'next/link';
import { Box, ArrowRight } from 'lucide-react';
import { SearchBar } from '@/components/workflows/SearchBar';
import { ROUTES } from '@/constants/routes';
import { EmptyState } from '@/components/ui/EmptyState';
import { Node } from '@/data/mock';

interface NodeWithCount extends Node {
    count: number;
}

interface NodesContentProps {
    initialNodes: NodeWithCount[];
}

export function NodesContent({ initialNodes }: NodesContentProps) {
    const [search, setSearch] = useState('');

    const filteredNodes = useMemo(() => {
        return initialNodes.filter(n =>
            n.name.toLowerCase().includes(search.toLowerCase()) ||
            n.description?.toLowerCase().includes(search.toLowerCase())
        ).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    }, [initialNodes, search]);

    return (
        <div className="space-y-12 py-4 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-muted/50">
                <div className="space-y-3 max-w-2xl">
                    <Title as="h1" className="text-4xl font-black tracking-tighter">Node Registry</Title>
                    <Text className="text-muted-foreground text-lg font-medium leading-relaxed">
                        The fundamental building blocks of n8n. Browse nodes used across our workflow library.
                    </Text>
                </div>
                <div className="w-full lg:w-96">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Filter nodes by name..."
                        onClear={() => setSearch('')}
                    />
                </div>
            </div>

            {filteredNodes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNodes.map((node) => (
                        <Link key={node.id} href={ROUTES.NODE_DETAIL(node.id)} className="group">
                            <div className="p-8 border-2 border-muted/30 rounded-3xl bg-card/30 backdrop-blur-sm shadow-sm hover:border-primary/50 transition-all group-hover:shadow-xl group-hover:shadow-primary/5 h-full flex items-start gap-6 overflow-hidden relative">
                                <div className="p-4 rounded-2xl bg-muted/50 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner shrink-0 scale-110">
                                    <Box className="w-7 h-7" />
                                </div>
                                <div className="flex-1 space-y-3 relative z-10">
                                    <div className="flex items-start justify-between">
                                        <Title as="h3" className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">{node.name}</Title>
                                        <span className="text-[10px] font-black font-mono bg-primary/5 text-primary px-2 py-1 rounded-md uppercase tracking-wider">
                                            {node.count} flows
                                        </span>
                                    </div>
                                    <Text className="text-sm text-muted-foreground/80 font-medium line-clamp-2 leading-relaxed">
                                        {node.description || 'Native n8n node for seamless automation and data processing.'}
                                    </Text>
                                    <div className="pt-4 flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-primary translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        Explore Node <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="Node not found"
                    description={`We couldn't find any nodes matching "${search}". Try searching for specific tools like "Slack" or "Discord".`}
                    action={{
                        label: "View All Nodes",
                        onClick: () => setSearch('')
                    }}
                />
            )}
        </div>
    );
}
