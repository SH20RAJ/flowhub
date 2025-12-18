import { Metadata } from 'next';
import { SubmitPageContent } from './SubmitPageContent';

export const metadata: Metadata = {
    title: "Submit Workflow",
    description: "Contribute to the largest collection of n8n automations. Help others build faster by sharing your battle-tested flows.",
    openGraph: {
        title: "Submit Workflow | Flowhub",
        description: "Contribute to the largest collection of n8n automations.",
    },
};

export default function SubmitPage() {
    return <SubmitPageContent />;
}
