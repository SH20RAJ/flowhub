import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { TagDetailContent } from './TagDetailContent';
import { db } from '@/db';
import { tags } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Workflow } from '@/data/mock';

interface Props {
    params: Promise<{ tag: string }>;
}

async function getTagWithWorkflows(slug: string) {
    return await db.query.tags.findFirst({
        where: eq(tags.slug, slug),
        with: {
            workflowTags: {
                with: {
                    workflow: {
                        with: {
                            author: true,
                            tags: { with: { tag: true } },
                            nodes: { with: { node: true } }
                        }
                    }
                }
            }
        }
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { tag } = await params;
    const tagData = await getTagWithWorkflows(tag);

    if (!tagData) return {};

    return {
        title: `${tagData.name} Workflows`,
        description: `Browse production-ready n8n workflows categorized under ${tagData.name}.`,
    };
}

export default async function TagDetailPage({ params }: Props) {
    const { tag } = await params;

    // Note: The URL slug might be simple, but our DB slug might be different?
    // Use the slug from URL directly as it should match DB slug.
    const tagData = await getTagWithWorkflows(tag);

    if (!tagData) {
        // Try deslugifying and searching by name? Or logic in fetch?
        // Let's assume slug matches.
        return notFound();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredWorkflows: Workflow[] = (tagData.workflowTags as any[]).map(wt => {
        const w = wt.workflow;
        return {
            id: w.id,
            title: w.title,
            description: w.description || '',
            slug: w.slug,
            json: w.json,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            difficulty: (w.difficulty as any) || 'Beginner',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            source: (w.sourceType as any) || 'community',
            authorId: w.authorId || '',
            createdAt: w.createdAt || new Date().toISOString(),
            updatedAt: w.updatedAt || new Date().toISOString(),
            downloads: 0,
            views: 0,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            tags: w.tags.map((t: any) => t.tag.name),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            nodes: w.nodes.map((n: any) => n.node.name),
            license: w.license || 'MIT',
        };
    });

    return <TagDetailContent tagName={tagData.name} workflows={filteredWorkflows} />;
}
