'use client';

import { Title, Text } from 'rizzui';
import { SubmitForm } from './SubmitForm';

export function SubmitPageContent() {
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
