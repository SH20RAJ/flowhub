import { workflows, tags } from '@/data/mock';
import { Title, Text, Button } from 'rizzui';
import { WorkflowCard } from '@/components/workflows/WorkflowCard';
import { TagBadge } from '@/components/ui/TagBadge';
import Link from 'next/link';
import { ArrowRight, Zap, Shield } from 'lucide-react';

export default function HomePage() {
	const featuredWorkflows = workflows.filter(w => w.featured);
	const recentWorkflows = [...workflows].sort((a, b) =>
		new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	).slice(0, 4);

	return (
		<div className="space-y-16 py-8">
			{/* Hero Section */}
			<section className="max-w-3xl space-y-4">
				<Title as="h1" className="text-4xl md:text-5xl font-extrabold tracking-tight">
					Automate everything. <br />
					<span className="text-muted-foreground">Share the flows.</span>
				</Title>
				<Text className="text-lg text-muted-foreground leading-relaxed">
					The developer-first hub for n8n workflows. Discover, copy, and contribute
					production-grade automations for your favorite tools.
				</Text>
				<div className="flex items-center gap-4 pt-4">
					<Link href="/workflows">
						<Button size="lg" className="rounded-full gap-2">
							Browse Workflows <ArrowRight className="w-4 h-4" />
						</Button>
					</Link>
					<Link href="/about">
						<Button variant="outline" size="lg" className="rounded-full">
							Learn More
						</Button>
					</Link>
				</div>
			</section>

			{/* Featured Workflows */}
			<section className="space-y-6">
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<Title as="h2" className="text-xl font-bold">Featured Workflows</Title>
						<Text className="text-sm text-muted-foreground">Hand-picked by the community.</Text>
					</div>
					<Link href="/workflows" className="text-sm font-medium hover:underline flex items-center gap-1">
						View all <ArrowRight className="w-3.5 h-3.5" />
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{featuredWorkflows.map((workflow) => (
						<WorkflowCard key={workflow.id} workflow={workflow} />
					))}
				</div>
			</section>

			{/* Popular Tags */}
			<section className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y py-12 border-border/50">
				<div className="col-span-1 space-y-2">
					<Title as="h3" className="text-base font-bold uppercase tracking-wider text-muted-foreground">Popular Topics</Title>
					<Text className="text-sm text-muted-foreground">Browse workflows by category and use case.</Text>
					<div className="flex flex-wrap gap-2 pt-2">
						{tags.slice(0, 10).map((tag) => (
							<TagBadge key={tag} tag={tag} />
						))}
					</div>
				</div>
				<div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
					<div className="space-y-3">
						<div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
							<Zap className="w-5 h-5" />
						</div>
						<Title as="h4" className="text-sm font-bold">Fast Integration</Title>
						<Text className="text-xs text-muted-foreground leading-relaxed">
							Copy-paste ready JSON. No complex setup, just import and run.
						</Text>
					</div>
					<div className="space-y-3">
						<div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
							<Shield className="w-5 h-5" />
						</div>
						<Title as="h4" className="text-sm font-bold">Community Vetted</Title>
						<Text className="text-xs text-muted-foreground leading-relaxed">
							Workflows are reviewed for security and performance best practices.
						</Text>
					</div>
				</div>
			</section>

			{/* Recent Updates */}
			<section className="space-y-6">
				<Title as="h2" className="text-xl font-bold">Recent Updates</Title>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{recentWorkflows.map((workflow) => (
						<Link
							key={workflow.id}
							href={`/workflows/${workflow.slug}`}
							className="group p-4 rounded-lg border bg-muted/20 hover:border-primary/30 transition-all"
						>
							<Title as="h4" className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
								{workflow.title}
							</Title>
							<Text className="text-[11px] text-muted-foreground mt-1">
								{new Date(workflow.updatedAt).toLocaleDateString()} • {workflow.difficulty}
							</Text>
						</Link>
					))}
				</div>
			</section>
		</div>
	);
}
