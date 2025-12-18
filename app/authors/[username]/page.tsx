import { workflows, authors } from '@/data/mock';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { AuthorProfileContent } from './AuthorProfileContent';

interface Props {
    params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params;
    const author = authors.find(a => a.username.toLowerCase() === username.toLowerCase());

    if (!author) return {};

    return {
        title: `${author.name} (@${author.username})`,
        description: author.bio || `View n8n workflows and automations by ${author.name} on Flowhub.`,
    };
}

export default async function Page({ params }: Props) {
    const { username } = await params;

    const author = authors.find(a => a.username.toLowerCase() === username.toLowerCase());
    const authorWorkflows = workflows.filter(w => w.authorId === author?.id);

    if (!author) {
        notFound();
    }

    return <AuthorProfileContent author={author} workflows={authorWorkflows} />;
}
