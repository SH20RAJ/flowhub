import { MetadataRoute } from 'next';
import { db } from '@/db';
import { slugify } from '@/utils/slug';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://flowhub.strivio.world';

    // Base routes
    const routes = ['', '/workflows', '/tags', '/nodes', '/about', '/submit'].map(
        (route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: route === '' ? 1 : 0.8,
        })
    );

    // Dynamic workflow routes (limit/batch if necessary, but fetching all for now as requested)
    const allWorkflows = await db.query.workflows.findMany({
        columns: {
            slug: true,
            updatedAt: true,
        },
    });

    const workflowRoutes = allWorkflows.map((w) => ({
        url: `${baseUrl}/workflows/${w.slug}`,
        lastModified: new Date(w.updatedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Dynamic tag routes
    const allTags = await db.query.tags.findMany({
        columns: {
            slug: true,
        },
    });

    const tagRoutes = allTags.map((t) => ({
        // Ensure slug matches what is used in app/tags/[tag]
        url: `${baseUrl}/tags/${t.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    }));

    // Dynamic node routes
    const allNodes = await db.query.nodes.findMany({
        columns: {
            id: true,
        },
    });

    const nodeRoutes = allNodes.map((n) => ({
        url: `${baseUrl}/nodes/${slugify(n.id)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    }));

    // Dynamic author routes (users who have workflows)
    // Could filter only users who have workflows if needed, but for now fetching all users might be okay or too many.
    // Let's fetch authors with workflows to be safe/filtered.
    const allAuthors = await db.query.users.findMany({
        columns: {
            username: true,
        },
        // In a real app, maybe filter where users.workflows exists
    });

    const authorRoutes = allAuthors
        .filter(a => a.username) // Ensure username exists
        .map((a) => ({
            url: `${baseUrl}/authors/${a.username!.toLowerCase()}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.4,
        }));

    return [...routes, ...workflowRoutes, ...tagRoutes, ...nodeRoutes, ...authorRoutes];
}
