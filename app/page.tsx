import { workflows, tags } from '@/data/mock';
import { HomeContent } from './HomeContent';
import { Metadata } from 'next';

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

export default function HomePage() {
	const featuredWorkflows = workflows.slice(0, 3);
	const recentWorkflows = workflows.slice(3, 6);
	const popularTags = tags.slice(0, 6);

	return (
		<HomeContent
			featuredWorkflows={featuredWorkflows}
			recentWorkflows={recentWorkflows}
			popularTags={popularTags}
		/>
	);
}
