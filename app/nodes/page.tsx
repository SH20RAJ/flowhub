'use client';

import { useState } from 'react';
import { nodes, workflows } from '@/data/mock';
import { Title, Text, Input, Card } from 'rizzui';
import Link from 'next/link';
import { Box, Search, ArrowRight } from 'lucide-react';

export default function NodesPage() {
    const [search, setSearch] = useState('');

    const nodeStats = nodes.map(node => ({
        ...node,
        count: workflows.filter(w => w.nodes.includes(node.id)).length
    })).filter(n => n.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="space-y-8 py-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <Title as="h1" className="text-3xl font-bold">Nodes</Title>
                    <Text className="text-muted-foreground">Library of all n8n nodes used in community workflows.</Text>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search nodes..."
                        className="pl-10 h-10 w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nodeStats.map((node) => (
                    <Link key={node.id} href={`/nodes/${node.id}`}>
                        <Card className="p-5 hover:border-primary/50 transition-all group flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                <Box className="w-6 h-6" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <Title as="h3" className="text-base font-bold">{node.name}</Title>
                                    <Text className="text-[11px] font-mono text-muted-foreground">{node.count} uses</Text>
                                </div>
                                <Text className="text-sm text-muted-foreground line-clamp-2 leading-snug">
                                    {node.description || 'No description available for this node.'}
                                </Text>
                                <div className="pt-2 flex items-center text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    View workflows <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
                {nodeStats.length === 0 && (
                    <div className="col-span-full py-20 text-center border border-dashed rounded-lg bg-muted/5">
                        <Text className="text-muted-foreground">No nodes found matching your search.</Text>
                    </div>
                )}
            </div>
        </div>
    );
}
