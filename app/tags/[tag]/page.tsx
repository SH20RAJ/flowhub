import { workflows } from '@/data/mock';
import { deslugify } from '@/utils/slug';
import { Metadata } from 'next';
import { TagDetailContent } from './TagDetailContent';

interface Props {
    params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { tag } = await params;
    const tagName = deslugify(tag);

    return {
        title: `${tagName} Workflows`,
        description: `Browse production-ready n8n workflows categorized under ${tagName}.`,
    };
}

export default async function TagDetailPage({ params }: Props) {
    const { tag } = await params;
    const tagName = deslugify(tag);

    const filteredWorkflows = workflows.filter(w =>
        w.tags.some(t => t.toLowerCase() === tagName.toLowerCase())
    );

    return <TagDetailContent tagName={tagName} workflows={filteredWorkflows} />;
}
