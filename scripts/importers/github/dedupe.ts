import { createHash } from 'crypto';

export function computeWorkflowHash(jsonString: string): string {
    try {
        // Parse and re-stringify to ensure stable key order and formatting
        const obj = JSON.parse(jsonString);

        // Remove volatile fields if any (like execution ids, though usually not in templates)
        // For strictly deterministic hash, we sort keys.
        const normalized = JSON.stringify(obj, Object.keys(obj).sort());

        return createHash('sha256').update(normalized).digest('hex');
    } catch (e) {
        return createHash('sha256').update(jsonString).digest('hex'); // Fallback for invalid JSON (though it will fail parse later)
    }
}
