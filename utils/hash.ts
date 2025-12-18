/**
 * Generates a simple hash from a string (frontend-safe).
 * This is useful for consistent key generation or basic ID creation.
 */
export function getHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
}
