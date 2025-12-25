
import { db } from "../db";
import { sql } from "drizzle-orm";

async function main() {
    console.log("Running manual migration...");

    try {
        try {
            await db.run(sql`ALTER TABLE workflows ADD COLUMN upvotes integer DEFAULT 0`);
            console.log("Added upvotes column");
        } catch (e) {
            console.log("upvotes column might already exist or error:", e.message);
        }

        try {
            await db.run(sql`ALTER TABLE workflows ADD COLUMN downvotes integer DEFAULT 0`);
            console.log("Added downvotes column");
        } catch (e) {
            console.log("downvotes column might already exist or error:", e.message);
        }

        try {
            await db.run(sql`
        CREATE TABLE IF NOT EXISTS workflow_votes (
            id text PRIMARY KEY NOT NULL,
            workflow_id text NOT NULL REFERENCES workflows(id),
            user_id text NOT NULL,
            vote_type integer NOT NULL,
            created_at text DEFAULT CURRENT_TIMESTAMP
        )
        `);
            console.log("Created workflow_votes table");
        } catch (e) {
            console.log("Error creating table:", e.message);
        }

        try {
            await db.run(sql`
        CREATE UNIQUE INDEX IF NOT EXISTS unique_user_workflow_vote ON workflow_votes (workflow_id, user_id)
        `);
            console.log("Created unique index");
        } catch (e) {
            console.log("Error creating index:", e.message);
        }

        console.log("Migration completed");
    } catch (err) {
        console.error("Migration failed", err);
    }
}

main();
