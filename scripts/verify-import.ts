
import { db } from '@/db';
import { workflows } from '@/db/schema';
import { eq, count } from 'drizzle-orm';

async function main() {
    const result = await db.select({ count: count() })
        .from(workflows)
        .where(eq(workflows.sourceType, 'ritik'));

    console.log(`✅ Ritik Workflows in DB: ${result[0].count}`);

    const example = await db.query.workflows.findFirst({
        where: eq(workflows.sourceType, 'ritik')
    });

    if (example) {
        console.log('📝 Example Workflow:', {
            title: example.title,
            slug: example.slug,
            jsonUrl: example.jsonUrl
        });
    }
}

main().catch(console.error);
