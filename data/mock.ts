import { Difficulty, Source } from '@/constants/enums';

export interface Author {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    bio?: string;
    github?: string;
    website?: string;
}

export interface Node {
    id: string;
    name: string;
    icon?: string;
    description?: string;
}

export interface Workflow {
    id: string;
    slug: string;
    title: string;
    description: string;
    json: string;
    difficulty: Difficulty;
    source: Source;
    license: string;
    authorId: string;
    tags: string[];
    nodes: string[];
    createdAt: string;
    updatedAt: string;
    featured?: boolean;
}

export const authors: Author[] = [
    {
        id: '1',
        name: 'n8n Official',
        username: 'n8n',
        bio: 'Official workflows from the n8n team.',
        github: 'https://github.com/n8n-io',
        website: 'https://n8n.io',
    },
    {
        id: '2',
        name: 'Jane Doe',
        username: 'janedoe',
        bio: 'Automation enthusiast and workflow architect.',
        github: 'https://github.com/janedoe',
    },
];

export const nodes: Node[] = [
    { id: 'http', name: 'HTTP Request', description: 'Make HTTP requests to any API.' },
    { id: 'discord', name: 'Discord', description: 'Interact with Discord via webhooks or bot API.' },
    { id: 'slack', name: 'Slack', description: 'Send messages and interact with Slack.' },
    { id: 'postgres', name: 'PostgreSQL', description: 'Query and update PostgreSQL databases.' },
    { id: 'cron', name: 'Cron', description: 'Trigger workflows at specific intervals.' },
    { id: 'wait', name: 'Wait', description: 'Wait for a specific amount of time.' },
    { id: 'set', name: 'Set', description: 'Set workflow variables.' },
];

export const tags = [
    'Productivity',
    'Marketing',
    'DevOps',
    'Finance',
    'Social Media',
    'E-commerce',
    'AI',
];

export const workflows: Workflow[] = [
    {
        id: '1',
        slug: 'discord-notifications-for-github-stars',
        title: 'Discord Notifications for GitHub Stars',
        description: 'Get a Discord message every time someone stars your GitHub repository.',
        json: JSON.stringify({
            nodes: [
                { parameters: {}, name: 'GitHub', type: 'n8n-nodes-base.github', typeVersion: 1, position: [250, 300] },
                { parameters: {}, name: 'Discord', type: 'n8n-nodes-base.discord', typeVersion: 1, position: [500, 300] }
            ],
            connections: {
                GitHub: { main: [[{ node: 'Discord', type: 'main', index: 0 }]] }
            }
        }, null, 2),
        difficulty: Difficulty.Beginner,
        source: Source.Official,
        license: 'MIT',
        authorId: '1',
        tags: ['DevOps', 'Social Media'],
        nodes: ['github', 'discord'],
        createdAt: '2023-10-01T10:00:00Z',
        updatedAt: '2023-10-05T12:00:00Z',
        featured: true,
    },
    {
        id: '2',
        slug: 'auto-backup-postgres-to-s3',
        title: 'Auto-backup PostgreSQL to S3',
        description: 'Daily backup of your PostgreSQL database to an AWS S3 bucket.',
        json: '{\n  "nodes": [\n    { "type": "cron", "position": [100, 200] },\n    { "type": "postgres", "position": [300, 200] },\n    { "type": "s3", "position": [500, 200] }\n  ]\n}',
        difficulty: Difficulty.Intermediate,
        source: Source.Community,
        license: 'Apache-2.0',
        authorId: '2',
        tags: ['DevOps', 'Productivity'],
        nodes: ['cron', 'postgres', 'aws-s3'],
        createdAt: '2023-11-15T09:00:00Z',
        updatedAt: '2023-11-15T09:00:00Z',
        featured: true,
    },
    {
        id: '3',
        slug: 'summarize-slack-messages-with-openai',
        title: 'Summarize Slack Messages with OpenAI',
        description: 'Automatically summarize long Slack threads using OpenAI and post them back.',
        json: '{\n  "nodes": [\n    { "type": "slack-trigger", "position": [100, 200] },\n    { "type": "openai", "position": [300, 200] },\n    { "type": "slack-post", "position": [500, 200] }\n  ]\n}',
        difficulty: Difficulty.Advanced,
        source: Source.Community,
        license: 'MIT',
        authorId: '2',
        tags: ['AI', 'Productivity'],
        nodes: ['slack', 'openai'],
        createdAt: '2023-12-01T14:30:00Z',
        updatedAt: '2023-12-02T10:00:00Z',
    },
];
