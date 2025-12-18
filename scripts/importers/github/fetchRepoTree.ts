
export async function fetchRepoTree(owner: string, repo: string, branch: string = 'main') {
    const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Flowhub-Importer'
    };

    if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    console.log(`[GitHub] Fetching tree for ${owner}/${repo}...`);

    const response = await fetch(url, { headers });

    if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 403 && errorText.includes('rate limit')) {
            throw new Error(`GitHub API rate limit exceeded. Try adding GITHUB_TOKEN.`);
        }
        if (response.status === 404 && branch === 'main') {
            // Fallback to master if main not found? Could trigger a retry logic in caller.
            // For now, simpler to just fail and let user adjust config.
            throw new Error(`Repo not found or branch invalid: ${url}`);
        }
        throw new Error(`GitHub API error ${response.status}: ${errorText}`);
    }

    const data = await response.json() as { tree: any[] };

    // Filter for .json files, ignore node_modules and .github
    return (data.tree).filter(file =>
        file.path.endsWith('.json') &&
        !file.path.includes('node_modules') &&
        !file.path.includes('.github') &&
        !file.path.includes('package.json') &&
        !file.path.includes('tsconfig.json')
    );
}

export async function fetchRawFile(owner: string, repo: string, path: string, branch: string = 'main') {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch file ${path}`);
    return await response.text();
}
