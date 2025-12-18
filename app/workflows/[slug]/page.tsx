import { workflows, authors } from '@/data/mock';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { WorkflowDetailContent } from './WorkflowDetailContent';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const workflow = workflows.find((w) => w.slug === slug);

    if (!workflow) return {};

    const author = authors.find((a) => a.id === workflow.authorId);

    return {
        title: workflow.title,
        description: workflow.description,
        openGraph: {
            title: workflow.title,
            description: workflow.description,
            type: 'article',
            publishedTime: workflow.createdAt,
            modifiedTime: workflow.updatedAt,
            authors: author ? [author.name] : undefined,
            tags: workflow.tags,
            images: [
                {
                    url: `/api/og?title=${encodeURIComponent(workflow.title)}`, // Idealized OG generation
                    width: 1200,
                    height: 630,
                    alt: workflow.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: workflow.title,
            description: workflow.description,
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const workflow = workflows.find((w) => w.slug === slug);

    if (!workflow) {
        notFound();
    }

    const author = authors.find((a) => a.id === workflow.authorId);

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: workflow.title,
        description: workflow.description,
        codeSampleType: 'n8n Workflow',
        programmingLanguage: 'JSON',
        runtimePlatform: 'n8n',
        author: author ? {
            '@type': 'Person',
            name: author.name,
            url: `https://flowhub.strivio.world/authors/${author.username.toLowerCase()}`,
        } : undefined,
        datePublished: workflow.createdAt,
        dateModified: workflow.updatedAt,
        license: workflow.license,
        keywords: workflow.tags.join(', '),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <WorkflowDetailContent workflow={workflow} author={author} />
        </>
    );
}
