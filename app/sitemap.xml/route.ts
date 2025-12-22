export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { count } from 'drizzle-orm';
import { workflows } from '@/db/schema';

const WORKFLOWS_PER_SITEMAP = 1000;

export async function GET() {
    const baseUrl = 'https://flowhub.strivio.world';

    // 1. Get total workflow count
    const [countResult] = await db.select({ count: count() }).from(workflows);
    const totalWorkflows = countResult?.count || 0;
    const numberOfSitemaps = Math.ceil(totalWorkflows / WORKFLOWS_PER_SITEMAP);

    // 2. Generate XML for sitemap index
    let sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>${baseUrl}/sitemap-base.xml</loc>
    </sitemap>`;

    for (let i = 0; i < numberOfSitemaps; i++) {
        sitemapIndexXML += `
    <sitemap>
        <loc>${baseUrl}/sitemap-workflows/${i}.xml</loc>
    </sitemap>`;
    }

    sitemapIndexXML += `
</sitemapindex>`;

    return new Response(sitemapIndexXML, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
