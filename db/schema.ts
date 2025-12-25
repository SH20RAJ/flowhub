import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, primaryKey, uniqueIndex } from 'drizzle-orm/sqlite-core';

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
    jsonUrl: text('json_url'), // Link to raw JSON
    hash: text('hash').unique(),
    difficulty: text('difficulty'), // Beginner, Intermediate, Advanced
    nodeCount: integer('node_count'),
    preview: text('preview'), // Preview text/string
    upvotes: integer('upvotes').default(0),
    downvotes: integer('downvotes').default(0),
    isVerified: integer('is_verified', { mode: 'boolean' }).default(false),
    sourceType: text('source_type'), // community, github, url
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

export const sources = sqliteTable('sources', {
    id: text('id').primaryKey(),
    url: text('url').unique().notNull(),
    name: text('name').notNull(),
    owner: text('owner').notNull(),
    repo: text('repo').notNull(),
    lastSyncedAt: text('last_synced_at').default(sql`CURRENT_TIMESTAMP`),
});

export const workflowVotes = sqliteTable('workflow_votes', {
    id: text('id').primaryKey(),
    workflowId: text('workflow_id').notNull().references(() => workflows.id),
    userId: text('user_id').notNull(), // StackAuth user ID
    voteType: integer('vote_type').notNull(), // 1 for upvote, -1 for downvote
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
}, (t) => ({
    uniqueVote: uniqueIndex('unique_user_workflow_vote').on(t.workflowId, t.userId),
}));

import { relations } from 'drizzle-orm';

export const workflowsRelations = relations(workflows, ({ one, many }) => ({
    author: one(users, {
        fields: [workflows.authorId],
        references: [users.id],
    }),
    tags: many(workflowTags),
    nodes: many(workflowNodes),
    votes: many(workflowVotes),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
    workflowTags: many(workflowTags),
}));

export const workflowTagsRelations = relations(workflowTags, ({ one }) => ({
    workflow: one(workflows, {
        fields: [workflowTags.workflowId],
        references: [workflows.id],
    }),
    tag: one(tags, {
        fields: [workflowTags.tagId],
        references: [tags.id],
    }),
}));

export const workflowNodesRelations = relations(workflowNodes, ({ one }) => ({
    workflow: one(workflows, {
        fields: [workflowNodes.workflowId],
        references: [workflows.id],
    }),
    node: one(nodes, {
        fields: [workflowNodes.nodeId],
        references: [nodes.id],
    }),
}));

export const usersRelations = relations(users, ({ many }) => ({
    workflows: many(workflows),
}));

export const nodesRelations = relations(nodes, ({ many }) => ({
    workflowNodes: many(workflowNodes),
}));

export const workflowVotesRelations = relations(workflowVotes, ({ one }) => ({
    workflow: one(workflows, {
        fields: [workflowVotes.workflowId],
        references: [workflows.id],
    }),
}));

// Added uniqueIndex to imports

