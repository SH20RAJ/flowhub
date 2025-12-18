
import { slugify } from '@/utils/slug';

export interface ParsedWorkflow {
    title: string;
    description: string;
    nodes: string[];
    json: string;
    tags: string[];
    slug: string;
}

export function parseWorkflow(jsonString: string, filePath: string, repoName: string): ParsedWorkflow | null {
    try {
        const data = JSON.parse(jsonString);

        // Validate basic structure (n8n workflows usually have "nodes" and "connections")
        if (!Array.isArray(data.nodes) && !data.connections) {
            console.warn(`[Parser] Skipping ${filePath}: Valid n8n structure not found.`);
            return null;
        }

        const nodesList = Array.isArray(data.nodes) ? data.nodes : [];
        const nodeTypes = [...new Set(nodesList.map((n: any) => n.type))] as string[];

        // Extract Title
        let title = data.name || filePath.split('/').pop()?.replace('.json', '') || 'Untitled Workflow';

        // Extract Description
        let description = 'Imported from Community Repository';
        // Try to find a Note node with description? Or check data meta?
        // n8n v1 workflows might have meta.
        if (data.meta && data.meta.description) {
            description = data.meta.description;
        }

        // Generate normalized JSON
        const normalizedJson = JSON.stringify(data);

        // Extract Tags from path
        // e.g. "workflows/google-sheets/my-flow.json" -> ["google-sheets"]
        const pathParts = filePath.split('/');
        const folderTags = pathParts.slice(0, -1).filter(p => !['workflows', 'templates', 'dist', 'src'].includes(p.toLowerCase()));
        const tags = [...new Set([...folderTags, repoName])];

        const slug = slugify(title) + '-' + Math.random().toString(36).substring(2, 7);

        return {
            title,
            description,
            nodes: nodeTypes.map(n => n.replace('n8n-nodes-base.', '')),
            json: normalizedJson,
            tags,
            slug
        };

    } catch (e) {
        console.error(`[Parser] Error parsing ${filePath}:`, e);
        return null;
    }
}
