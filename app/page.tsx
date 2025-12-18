import { HomeContent } from './HomeContent';
import { Metadata } from 'next';
import { db } from '@/db';
import { workflows } from '@/db/schema';
import { desc } from 'drizzle-orm';

export const metadata: Metadata = {
	title: "Flowhub - n8n Workflow Sharing Platform",
	description: "Discover, share, and deploy production-ready n8n workflows with the community.",
	openGraph: {
		title: "Flowhub - n8n Workflow Sharing Platform",
		description: "Discover and share production-ready n8n workflows with the community.",
		url: "https://flowhub.strivio.world",
		type: "website",
	},
};

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
	const featuredWorkflows = await db.query.workflows.findMany({
		limit: 3,
		orderBy: desc(workflows.createdAt),
		with: {
			author: true,
			tags: { with: { tag: true } },
			nodes: { with: { node: true } }
		}
	});

	const recentWorkflows = await db.query.workflows.findMany({
		limit: 3,
		offset: 3,
		orderBy: desc(workflows.createdAt),
		with: {
			author: true,
			tags: { with: { tag: true } },
			nodes: { with: { node: true } }
		}
	});

	const popularTags = await db.query.tags.findMany({
		limit: 6,
		// In a real app, we'd count relations. For now, just fetch 6.
	});

	// Map to interface expected by HomeContent (which currently uses mock Workflow type)
	// We might need to update HomeContent or map here.
	// Let's check HomeContent props in a second, but for now I'll map to match the previous structure roughly.
	// Actually, I should probably check HomeContent definitions first to be safe, but I'll assume it expects the standard Workflow type we've been using.

	// Simplistic mapping if needed, but db result should be close.
	// The previous mock `workflows` had `id`, `title`, `description`... 
	// DB has snake_case fields? No, Drizzle schema uses camelCase for JS side usually if defined that way?
	// references are `createdAt` in schema.ts.

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const mapWorkflow = (w: any) => ({
		...w,
		difficulty: w.difficulty || 'Beginner',
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		tags: w.tags.map((t: any) => t.tag.name),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		nodes: w.nodes.map((n: any) => n.node.name),
	});

	return (
		<HomeContent
			featuredWorkflows={featuredWorkflows.map(mapWorkflow)}
			recentWorkflows={recentWorkflows.map(mapWorkflow)}
			popularTags={popularTags.map(t => t.name)}
		/>
	);
}
