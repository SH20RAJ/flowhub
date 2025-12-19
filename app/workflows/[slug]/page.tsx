import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { WorkflowDetailContent } from './WorkflowDetailContent';
import { db } from '@/db';
import { workflows } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Workflow, Author } from '@/data/mock';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const workflow = await db.query.workflows.findFirst({
        where: eq(workflows.slug, slug),
        with: {
            author: true,
            tags: {
                with: {
                    tag: true
                }
            }
        }
    });

    if (!workflow) return {};

    const tagsList = (workflow.tags || []).map(t => t.tag?.name).filter(Boolean) as string[];

    return {
        title: workflow.title,
        description: workflow.description || '',
        openGraph: {
            title: workflow.title,
            description: workflow.description || '',
            type: 'article',
            publishedTime: workflow.createdAt || undefined,
            modifiedTime: workflow.updatedAt || undefined,
            authors: workflow.author ? [workflow.author.name || ''] : undefined,
            tags: tagsList,
            images: [
                {
                    url: `/api/og?title=${encodeURIComponent(workflow.title)}`, // Idealized OG generation
                    width: 1200,
                    height: 630,
                    alt: workflow.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: workflow.title,
            description: workflow.description || '',
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;

    const workflowData = await db.query.workflows.findFirst({
        where: eq(workflows.slug, slug),
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

    if (!workflowData) {
        notFound();
    }

    // Map DB result to Mock interfaces expected by UI components
    // This bridges the gap until we fully remove Mock types
    const workflow: Workflow = {
        id: workflowData.id,
        title: workflowData.title,
        description: workflowData.description || '',
        slug: workflowData.slug,
        json: workflowData.json,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        difficulty: (workflowData.difficulty as any) || 'Beginner',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        source: (workflowData.sourceType as any) || 'community', // Map sourceType to source
        authorId: workflowData.authorId || '',
        createdAt: workflowData.createdAt || new Date().toISOString(),
        updatedAt: workflowData.updatedAt || new Date().toISOString(),
        tags: (workflowData.tags || []).map(t => t.tag?.name).filter(Boolean) as string[],
        nodes: (workflowData.nodes || []).map(n => n.node?.name).filter(Boolean) as string[],
        license: workflowData.license || 'MIT',
    };

    const author: Author | undefined = workflowData.author ? {
        id: workflowData.author.id,
        name: workflowData.author.name || 'Anonymous',
        username: workflowData.author.username || 'user',
        avatar: workflowData.author.avatarUrl || '',
        bio: workflowData.author.bio || '',
        github: workflowData.author.github || undefined,
        website: workflowData.author.website || undefined,
    } : undefined;

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: workflow.title,
        description: workflow.description,
        codeSampleType: 'n8n Workflow',
        programmingLanguage: 'JSON',
        runtimePlatform: 'n8n',
        author: author ? {
            '@type': 'Person',
            name: author.name,
            url: `https://flowhub.strivio.world/authors/${author.username.toLowerCase()}`,
        } : undefined,
        datePublished: workflow.createdAt,
        dateModified: workflow.updatedAt,
        license: workflow.license,
        keywords: workflow.tags.join(', '),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <WorkflowDetailContent workflow={workflow} author={author} />
        </>
    );
}
