import { tags, workflows } from '@/data/mock';
import { TagsContent } from './TagsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Category Tags",
    description: "Explore n8n workflows categorized by industry, tool, and use case.",
    openGraph: {
        title: "Category Tags | Flowhub",
        description: "Browse workflows by category.",
    },
};

export default function TagsPage() {
    const tagsWithCounts = tags.map(tag => ({
        name: tag,
        count: workflows.filter(w => w.tags.includes(tag)).length
    })).sort((a, b) => b.count - a.count);

    return (
        <TagsContent tagsWithCounts={tagsWithCounts} />
    );
}
