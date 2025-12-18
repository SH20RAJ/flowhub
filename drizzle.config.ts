import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './db/schema.ts',
    out: './drizzle',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH_TOKEN,
    },
});
