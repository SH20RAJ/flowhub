import { getCurrentUser } from '@/lib/current-user';
import { db } from '@/db';
import { workflows as workflowsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Title, Text } from 'rizzui';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import { notFound } from 'next/navigation';
import { EmptyState } from '@/components/ui/EmptyState';
import { ROUTES } from '@/constants/routes';

export default async function MyWorkflowsPage() {
    const user = await getCurrentUser();
    if (!user) return notFound();

    const myWorkflows = await db.query.workflows.findMany({
        where: eq(workflowsTable.authorId, user.id),
        orderBy: (workflows, { desc }) => [desc(workflows.createdAt)],
    });

    return (
        <div className="max-w-6xl mx-auto py-12 space-y-12 animate-in fade-in duration-700">
            <div className="space-y-4">
                <Title as="h1" className="text-4xl md:text-5xl font-black tracking-tighter">My Workflows</Title>
                <div className="flex items-center justify-between gap-6">
                    <Text className="text-muted-foreground text-lg font-medium leading-relaxed max-w-2xl">
                        You have contributed {myWorkflows.length} flows to the community.
                    </Text>
                    <div className="flex items-center gap-3 px-4 py-2 bg-muted/30 rounded-2xl border border-muted/50">
                        <span className="text-xl font-black text-primary">{myWorkflows.length}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Total</span>
                    </div>
                </div>
            </div>

            {myWorkflows.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    {myWorkflows.map((workflow) => (
                        <WorkflowCard
                            key={workflow.id}
                            workflow={{
                                ...workflow,
                                difficulty: (workflow.difficulty as any) || 'Beginner',
                                source: (workflow.sourceType as any) || 'Community',
                                tags: [],
                                nodes: [],
                                license: workflow.license || 'MIT',
                                description: workflow.description || '',
                                createdAt: workflow.createdAt || new Date().toISOString(),
                                updatedAt: workflow.updatedAt || new Date().toISOString(),
                            } as any}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20">
                    <EmptyState
                        title="No workflows published"
                        description="You haven't shared any workflows yet. Your contributions help the entire n8n community grow."
                        action={{
                            label: "Share Your First Flow",
                            onClick: () => window.location.href = ROUTES.SUBMIT
                        }}
                    />
                </div>
            )}
        </div>
    );
}
