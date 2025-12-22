export const dynamic = 'force-dynamic';

import { db } from '@/db';

const WORKFLOWS_PER_SITEMAP = 1000;

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const pageIndex = Number(id);
    const baseUrl = 'https://flowhub.strivio.world';

    if (isNaN(pageIndex)) {
        return new Response('Invalid Sitemap ID', { status: 400 });
    }

    const workflowsChunk = await db.query.workflows.findMany({
        columns: {
            slug: true,
            updatedAt: true,
        },
        limit: WORKFLOWS_PER_SITEMAP,
        offset: pageIndex * WORKFLOWS_PER_SITEMAP,
    });

    let urlSet = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    workflowsChunk.forEach(w => {
        urlSet += `
    <url>
        <loc>${baseUrl}/workflows/${w.slug}</loc>
        <lastmod>${new Date(w.updatedAt || new Date()).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
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
