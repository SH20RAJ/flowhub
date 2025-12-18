import { workflows, Workflow } from '@/data/mock';
import { WorkflowsContent } from './WorkflowsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Workflow Library",
    description: "Browse through hundreds of production-ready n8n automations. Filter by difficulty, tool, and industry.",
    openGraph: {
        title: "Workflow Library | Flowhub",
        description: "Browse through production-ready n8n automations.",
    },
};

export default function WorkflowsPage() {
    return (
        <WorkflowsContent workflows={workflows as Workflow[]} />
    );
}
