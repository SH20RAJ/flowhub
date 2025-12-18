import { getCurrentUser } from '@/lib/current-user';
import { db } from '@/db';
import { workflows as workflowsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MyWorkflowsContent } from './MyWorkflowsContent';

export const metadata: Metadata = {
    title: "My Workflows",
    description: "Manage and view your contributed n8n workflows.",
    robots: { index: false, follow: false },
};

export default async function MyWorkflowsPage() {
    const user = await getCurrentUser();
    if (!user) return notFound();

    const myWorkflows = await db.query.workflows.findMany({
        where: eq(workflowsTable.authorId, user.id),
        orderBy: (workflows, { desc }) => [desc(workflows.createdAt)],
    });

    return <MyWorkflowsContent workflows={myWorkflows} />;
}
