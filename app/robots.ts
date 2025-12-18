import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/handler/', '/api/'],
        },
        sitemap: 'https://flowhub.strivio.world/sitemap.xml',
    };
}
