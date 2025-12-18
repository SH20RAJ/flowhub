import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { AuthorProfileContent } from './AuthorProfileContent';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Workflow, Author } from '@/data/mock';

interface Props {
    params: Promise<{ username: string }>;
}

async function getAuthor(username: string) {
    return await db.query.users.findFirst({
        where: eq(users.username, username),
        with: {
            workflows: {
                with: {
                    author: true,
                    tags: { with: { tag: true } },
                    nodes: { with: { node: true } }
                }
            }
        }
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params;
    const author = await getAuthor(username);

    if (!author) return {};

    return {
        title: `${author.name} (@${author.username})`,
        description: author.bio || `View n8n workflows and automations by ${author.name} on Flowhub.`,
    };
}

export default async function Page({ params }: Props) {
    const { username } = await params;

    const authorData = await getAuthor(username);

    if (!authorData) {
        notFound();
    }

    const author: Author = {
        id: authorData.id,
        name: authorData.name || 'Anonymous',
        username: authorData.username || 'user',
        avatar: authorData.avatarUrl || '',
        bio: authorData.bio || '',
        // role: 'User', // Removed as it's not in Author type
        github: authorData.github || undefined,
        website: authorData.website || undefined,
        // twitter: undefined, // Removed as it's not in Author type
        // workflowsCount: authorData.workflows.length, // Removed as it's not in Author type
    };

    const authorWorkflows: Workflow[] = authorData.workflows.map(w => ({
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
        tags: w.tags.map(t => t.tag.name),
        nodes: w.nodes.map(n => n.node.name),
        license: w.license || 'MIT',
    }));

    return <AuthorProfileContent author={author} workflows={authorWorkflows} />;
}
