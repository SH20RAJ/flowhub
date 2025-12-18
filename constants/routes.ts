export const ROUTES = {
    HOME: '/',
    WORKFLOWS: '/workflows',
    WORKFLOW_DETAIL: (slug: string) => `/workflows/${slug}`,
    TAGS: '/tags',
    TAG_DETAIL: (slug: string) => `/tags/${slug}`,
    NODES: '/nodes',
    NODE_DETAIL: (id: string) => `/nodes/${id}`,
    AUTHORS: '/authors',
    AUTHOR_PROFILE: (username: string) => `/authors/${username}`,
    SUBMIT: '/submit',
    ABOUT: '/about',
    GITHUB_REPO: 'https://github.com/n8n-io/n8n',
} as const;
