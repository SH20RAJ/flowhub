export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { slugify } from '@/utils/slug';

export async function GET() {
    const baseUrl = 'https://flowhub.strivio.world';

    // Static routes
    const routes = ['', '/workflows', '/tags', '/nodes', '/about', '/submit'];

    let urlSet = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static
    routes.forEach(route => {
        urlSet += `
    <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${route === '' ? 1.0 : 0.8}</priority>
    </url>`;
    });

    // Dynamic Tags
    const allTags = await db.query.tags.findMany({ columns: { slug: true } });
    allTags.forEach(t => {
        urlSet += `
    <url>
        <loc>${baseUrl}/tags/${t.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
    </url>`;
    });

    // Dynamic Nodes
    const allNodes = await db.query.nodes.findMany({ columns: { id: true } });
    allNodes.forEach(n => {
        urlSet += `
    <url>
        <loc>${baseUrl}/nodes/${slugify(n.id)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
    </url>`;
    });

    // Authors
    const allAuthors = await db.query.users.findMany({ columns: { username: true } });
    allAuthors.filter(a => a.username).forEach(a => {
        urlSet += `
    <url>
        <loc>${baseUrl}/authors/${a.username!.toLowerCase()}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.4</priority>
    </url>`;
    });

    urlSet += `
</urlset>`;

    return new Response(urlSet, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
