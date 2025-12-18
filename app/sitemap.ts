import { MetadataRoute } from 'next';
import { workflows, tags, nodes, authors } from '@/data/mock';
import { slugify } from '@/utils/slug';

export default function sitemap(): MetadataRoute.Sitemap {
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

    // Dynamic workflow routes
    const workflowRoutes = workflows.map((w) => ({
        url: `${baseUrl}/workflows/${w.slug}`,
        lastModified: new Date(w.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Dynamic tag routes
    const tagRoutes = tags.map((t) => ({
        url: `${baseUrl}/tags/${slugify(t)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    }));

    // Dynamic node routes
    const nodeRoutes = nodes.map((n) => ({
        url: `${baseUrl}/nodes/${slugify(n.id)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
    }));

    // Dynamic author routes
    const authorRoutes = authors.map((a) => ({
        url: `${baseUrl}/authors/${a.username.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.4,
    }));

    return [...routes, ...workflowRoutes, ...tagRoutes, ...nodeRoutes, ...authorRoutes];
}
