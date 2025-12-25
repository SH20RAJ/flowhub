
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { TagDetailContent } from './TagDetailContent';
import { db } from '@/db';
import { tags, workflowVotes } from '@/db/schema';
import { eq, and, inArray } from 'drizzle-orm';
import { Workflow } from '@/data/mock';
import { stackServerApp } from '@/stack/server';

interface Props {
    params: Promise<{ tag: string }>;
    searchParams: Promise<{ sort?: string }>;
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

export default async function TagDetailPage({ params, searchParams }: Props) {
    const { tag } = await params;
    const { sort = 'newest' } = await searchParams;
    const user = await stackServerApp.getUser();

    // Note: The URL slug might be simple, but our DB slug might be different?
    // Use the slug from URL directly as it should match DB slug.
    const tagData = await getTagWithWorkflows(tag);

    console.log('TagDetailPage:', { tag, tagDataFound: !!tagData });

    if (!tagData) {
        console.log('Tag not found in DB, returning notFound()');
        return notFound();
    }

    let filteredWorkflows: Workflow[] = [];
    try {
        const workflowsList = (tagData.workflowTags).map((wt: any) => wt.workflow).filter(Boolean);
        const workflowIds = workflowsList.map((w: any) => w.id);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userVotesMap = new Map<string, number>();

        if (user && workflowIds.length > 0) {
            const votes = await db.query.workflowVotes.findMany({
                where: and(
                    eq(workflowVotes.userId, user.id),
                    inArray(workflowVotes.workflowId, workflowIds)
                )
            });
            votes.forEach(v => userVotesMap.set(v.workflowId, v.voteType));
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filteredWorkflows = workflowsList.map((w: any) => {
            return {
                id: w.id,
                title: w.title,
                description: w.description || '',
                slug: w.slug,
                json: '', // Exclude large JSON in list view
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                difficulty: (w.difficulty as any) || 'Beginner',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                source: (w.sourceType as any) || 'community',
                authorId: w.authorId || '',
                createdAt: w.createdAt || new Date().toISOString(),
                updatedAt: w.updatedAt || new Date().toISOString(),
                upvotes: w.upvotes ?? 0,
                downvotes: w.downvotes ?? 0,
                userVote: userVotesMap.get(w.id) || 0,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                tags: (w.tags || []).map((t: any) => t.tag?.name).filter(Boolean),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                nodes: (w.nodes || []).map((n: any) => n.node?.name).filter(Boolean),
                license: w.license || 'MIT',
            } as Workflow;
        });

        // Sort in memory
        if (sort === 'oldest') {
            filteredWorkflows.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        } else if (sort === 'most-upvoted') {
            filteredWorkflows.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
        } else {
            // Newest (Default)
            filteredWorkflows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

    } catch (error) {
        console.error('Error mapping workflows:', error);
    }

    return <TagDetailContent tagName={tagData.name} workflows={filteredWorkflows} />;
}
