
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    console.log('🌱 Seeding system users...');

    const systemId = 'system_importer';

    const existing = await db.query.users.findFirst({
        where: eq(users.id, systemId)
    });

    if (!existing) {
        await db.insert(users).values({
            id: systemId,
            name: 'Flowhub Importer',
            username: 'flowhub_bot',
            email: 'bot@flowhub.strivio.world',
            bio: 'Automated system account for importing workflows.',
            avatarUrl: 'https://ui-avatars.com/api/?name=Flowhub+Bot&background=random',
        });
        console.log('✅ Created system_importer user.');
    } else {
        console.log('✅ system_importer user already exists.');
    }
}

main().catch(console.error);
