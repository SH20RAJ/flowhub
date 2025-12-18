
import { db } from '@/db';
import { sql } from 'drizzle-orm';

async function main() {
    console.log('⚠️ Dropping sources table to fix schema drift...');
    try {
        await db.run(sql`DROP TABLE IF EXISTS sources`);
        console.log('✅ Dropped sources table.');
    } catch (e) {
        console.error('❌ Failed to drop sources table:', e);
    }
}

main().catch(console.error);
