import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: text('id').primaryKey(), // StackAuth user ID
    name: text('name'),
    username: text('username').unique(),
    email: text('email'),
    avatarUrl: text('avatar_url'),
    bio: text('bio'),
    website: text('website'),
    github: text('github'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const workflows = sqliteTable('workflows', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    slug: text('slug').unique().notNull(),
    json: text('json').notNull(),
    hash: text('hash').unique(),
    difficulty: text('difficulty'), // Beginner, Intermediate, Advanced
    isVerified: integer('is_verified', { mode: 'boolean' }).default(false),
    sourceType: text('source_type'), // community, github
    sourceUrl: text('source_url'),
    license: text('license'),
    authorId: text('author_id').references(() => users.id),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const tags = sqliteTable('tags', {
    id: text('id').primaryKey(),
    name: text('name').unique().notNull(),
    slug: text('slug').unique().notNull(),
});

export const workflowTags = sqliteTable('workflow_tags', {
    workflowId: text('workflow_id').notNull().references(() => workflows.id),
    tagId: text('tag_id').notNull().references(() => tags.id),
}, (t) => ({
    pk: primaryKey({ columns: [t.workflowId, t.tagId] }),
}));

export const nodes = sqliteTable('nodes', {
    id: text('id').primaryKey(),
    name: text('name').unique().notNull(),
});

export const workflowNodes = sqliteTable('workflow_nodes', {
    workflowId: text('workflow_id').notNull().references(() => workflows.id),
    nodeId: text('node_id').notNull().references(() => nodes.id),
}, (t) => ({
    pk: primaryKey({ columns: [t.workflowId, t.nodeId] }),
}));
