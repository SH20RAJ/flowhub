import { Title, Text } from 'rizzui';
import { Metadata } from 'next';
import { SubmitForm } from './SubmitForm';

export const metadata: Metadata = {
    title: "Submit Workflow",
    description: "Contribute to the largest collection of n8n automations. Help others build faster by sharing your battle-tested flows.",
    openGraph: {
        title: "Submit Workflow | Flowhub",
        description: "Contribute to the largest collection of n8n automations.",
    },
};

export default function SubmitPage() {
    return (
        <div className="max-w-4xl mx-auto py-8 space-y-12 animate-in fade-in duration-700">
            <div className="space-y-4 max-w-2xl">
                <Title as="h1" className="text-4xl md:text-5xl font-black tracking-tighter">Submit Workflow</Title>
                <Text className="text-muted-foreground text-lg font-medium leading-relaxed">
                    Contribute to the largest collection of n8n automations. Help others build faster by sharing your battle-tested flows.
                </Text>
            </div>

            <SubmitForm />
        </div>
    );
}
