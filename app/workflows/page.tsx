import { WorkflowsContent } from './WorkflowsContent';
import { Metadata } from 'next';
import { db } from '@/db';
import { Workflow } from '@/data/mock';
import { Difficulty, Source } from '@/constants/enums';
import { workflows } from '@/db/schema';
import { like, or, and, count, eq, asc, desc, inArray } from 'drizzle-orm';
import { stackServerApp } from '@/stack/server';
import { workflowVotes } from '@/db/schema';

export const dynamic = 'force-dynamic';

const baseUrl = 'https://flowhub.strivio.world';

export const metadata: Metadata = {
    title: "Workflow Library | Flowhub",
    description: "Browse through hundreds of production-ready n8n automations. Filter by difficulty, tool, and industry.",
    openGraph: {
        title: "Workflow Library | Flowhub",
        description: "Browse through production-ready n8n automations.",
        images: [{ url: `${baseUrl}/api/og?title=Workflow Library&description=Browse hundreds of n8n automations` }]
    },
    alternates: {
        canonical: `${baseUrl}/workflows`,
    },
};

interface PageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        difficulty?: string;
        source?: string;
        sort?: string;
    }>;
}

export default async function WorkflowsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const pageSize = 12;
    const offset = (page - 1) * pageSize;

    const search = params.search || '';
    const difficulty = params.difficulty || 'all';
    const source = params.source || 'all';
    const sort = params.sort || 'newest';

    const user = await stackServerApp.getUser();

    // Build filter conditions
    const conditions = [];

    if (search) {
        const searchLower = `%${search.toLowerCase()}%`;
        conditions.push(
            or(
                like(workflows.title, searchLower),
                like(workflows.description, searchLower)
            )
        );
    }

    if (difficulty !== 'all') {
        conditions.push(eq(workflows.difficulty, difficulty));
    }

    if (source !== 'all') {
        conditions.push(eq(workflows.sourceType, source));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // 1. Get total count for pagination
    const [countResult] = await db
        .select({ count: count() })
        .from(workflows)
        .where(whereClause);

    const totalCount = countResult?.count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    // 2. Fetch workflows with pagination
    const workflowsData = await db.query.workflows.findMany({
        where: whereClause,
        limit: pageSize,
        offset: offset,
        orderBy: sort === 'oldest' ? asc(workflows.createdAt) :
            sort === 'most-upvoted' ? desc(workflows.upvotes) :
                desc(workflows.createdAt),
        with: {
            author: true,
            tags: {
                with: {
                    tag: true
                }
            },
            nodes: {
                with: {
                    node: true
                }
            }
        }
    });

    const workflowIds = workflowsData.map(w => w.id);
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

    // 3. Map DB results to the Workflow interface
    const mappedWorkflows: Workflow[] = workflowsData.map(w => {
        try {
            return {
                id: w.id,
                title: w.title,
                description: w.description || '',
                slug: w.slug,
                json: '',
                difficulty: (w.difficulty as Difficulty) || Difficulty.Beginner,
                source: (w.sourceType as Source) || Source.Community,
                authorId: w.authorId || '',
                createdAt: w.createdAt || new Date().toISOString(),
                updatedAt: w.updatedAt || new Date().toISOString(),
                upvotes: w.upvotes ?? 0,
                downvotes: w.downvotes ?? 0,
                userVote: userVotesMap.get(w.id) || 0,
                tags: (w.tags || [])
                    .map(t => t.tag?.name)
                    .filter((name): name is string => !!name),
                nodes: (w.nodes || [])
                    .map(n => n.node?.name)
                    .filter((name): name is string => !!name),
                license: w.license || 'MIT',
            } as Workflow;
        } catch (error) {
            console.error(`Failed to map workflow with ID ${w.id}:`, error);
            return null;
        }
    }).filter((w): w is Workflow => w !== null);

    return (
        <WorkflowsContent
            workflows={mappedWorkflows}
            totalPages={totalPages}
            currentPage={page}
            totalCount={totalCount}
        />
    );
}
