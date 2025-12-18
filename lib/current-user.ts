import { users } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { stackServerApp } from '@/stack/server';

export async function getCurrentUser() {
    const stackUser = await stackServerApp.getUser();
    if (!stackUser) return null;

    // Sync with our database
    let dbUser = await db.query.users.findFirst({
        where: eq(users.id, stackUser.id),
    });

    if (!dbUser) {
        [dbUser] = await db.insert(users).values({
            id: stackUser.id,
            name: stackUser.displayName || stackUser.primaryEmail?.split('@')[0],
            email: stackUser.primaryEmail,
            avatarUrl: stackUser.profileImageUrl,
            username: stackUser.primaryEmail?.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, ''),
        }).returning();
    }

    return { ...stackUser, dbUser };
}
