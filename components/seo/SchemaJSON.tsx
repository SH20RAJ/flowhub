import Script from "next/script";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SchemaJSON({ json }: { json: Record<string, any> }) {
    return (
        <Script
            id="schema-json"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
        />
    );
}
