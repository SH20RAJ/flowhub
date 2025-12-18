
import { db } from '@/db';
import { sources } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { GITHUB_REPOS } from './config';
import { fetchRepoTree, fetchRawFile } from './fetchRepoTree';
import { parseWorkflow } from './parseWorkflow';
import { saveWorkflow } from './saveWorkflow';

async function main() {
    console.log('🚀 Starting GitHub Workflow Importer...');

    let totalImported = 0;
    let totalSkipped = 0;
    let totalErrors = 0;

    for (const repo of GITHUB_REPOS) {
        console.log(`\n📦 Processing Repo: ${repo.owner}/${repo.repo}`);

        const repoUrl = `https://github.com/${repo.owner}/${repo.repo}`;

        // 1. Sync Source to DB
        let sourceRecord = await db.query.sources.findFirst({
            where: eq(sources.url, repoUrl)
        });

        if (!sourceRecord) {
            const sourceId = Math.random().toString(36).substring(2, 10);
            await db.insert(sources).values({
                id: sourceId,
                url: repoUrl,
                name: repo.name,
                owner: repo.owner,
                repo: repo.repo
            });
            console.log(`   + Added Source: ${repo.name}`);
        } else {
            console.log(`   = Source exists: ${repo.name}`);
        }

        // 2. Fetch Tree
        try {
            const files = await fetchRepoTree(repo.owner, repo.repo, repo.branch);
            console.log(`   Found ${files.length} JSON files to scan.`);

            let processed = 0;
            for (const file of files) {
                processed++;
                /* if (processed % 10 === 0) process.stdout.write('.'); */

                try {
                    const content = await fetchRawFile(repo.owner, repo.repo, file.path, repo.branch);
                    const parsed = parseWorkflow(content, file.path, repo.name);

                    if (parsed) {
                        const saved = await saveWorkflow(parsed, { ...repo, url: repoUrl }, 'unknown');
                        if (saved) {
                            totalImported++;
                            console.log(`     ✅ Imported: ${parsed.title}`);
                        } else {
                            totalSkipped++;
                        }
                    } else {
                        // console.log(`     ⚠️  Skipped (Parse): ${file.path}`);
                        totalSkipped++;
                    }
                } catch (e) {
                    console.error(`     ❌ Error processing ${file.path}:`, e);
                    totalErrors++;
                }
            }

        } catch (e) {
            console.error(`   🛑 Failed to process repo ${repo.name}:`, e);
        }
    }

    console.log('\n✨ Import Complete!');
    console.log(`📊 Summary: ${totalImported} Imported | ${totalSkipped} Skipped | ${totalErrors} Errors`);
}

main().catch(console.error);
