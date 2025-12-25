
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { workflowVotes, workflows } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { stackServerApp } from '@/stack/server';

export async function POST(request: Request) {
    const user = await stackServerApp.getUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { workflowId, voteType } = await request.json() as any;

        if (!workflowId || ![1, -1].includes(voteType)) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const userId = user.id;

        // Check if user has already voted
        const existingVote = await db.query.workflowVotes.findFirst({
            where: and(
                eq(workflowVotes.workflowId, workflowId),
                eq(workflowVotes.userId, userId)
            ),
        });

        // We will perform updates in a transaction to ensure consistency
        await db.transaction(async (tx) => {
            if (existingVote) {
                if (existingVote.voteType === voteType) {
                    // Toggle off: Remove vote
                    await tx.delete(workflowVotes)
                        .where(eq(workflowVotes.id, existingVote.id));

                    if (voteType === 1) {
                        await tx.update(workflows)
                            .set({ upvotes: sql`${workflows.upvotes} - 1` })
                            .where(eq(workflows.id, workflowId));
                    } else {
                        await tx.update(workflows)
                            .set({ downvotes: sql`${workflows.downvotes} - 1` })
                            .where(eq(workflows.id, workflowId));
                    }
                } else {
                    // Change vote
                    await tx.update(workflowVotes)
                        .set({ voteType })
                        .where(eq(workflowVotes.id, existingVote.id));

                    if (voteType === 1) {
                        // Changed from downvote to upvote
                        await tx.update(workflows)
                            .set({
                                upvotes: sql`${workflows.upvotes} + 1`,
                                downvotes: sql`${workflows.downvotes} - 1`
                            })
                            .where(eq(workflows.id, workflowId));
                    } else {
                        // Changed from upvote to downvote
                        await tx.update(workflows)
                            .set({
                                upvotes: sql`${workflows.upvotes} - 1`,
                                downvotes: sql`${workflows.downvotes} + 1`
                            })
                            .where(eq(workflows.id, workflowId));
                    }
                }
            } else {
                // New vote
                await tx.insert(workflowVotes).values({
                    id: crypto.randomUUID(),
                    workflowId,
                    userId,
                    voteType,
                });

                if (voteType === 1) {
                    await tx.update(workflows)
                        .set({ upvotes: sql`${workflows.upvotes} + 1` })
                        .where(eq(workflows.id, workflowId));
                } else {
                    await tx.update(workflows)
                        .set({ downvotes: sql`${workflows.downvotes} + 1` })
                        .where(eq(workflows.id, workflowId));
                }
            }
        });

        // Fetch updated counts to return
        // Note: In a real high-concurrency app, we might just return the delta or optimistic expected value.
        // But fetching is safer for sync.
        const updatedWorkflow = await db.query.workflows.findFirst({
            where: eq(workflows.id, workflowId),
            columns: {
                upvotes: true,
                downvotes: true
            }
        });

        // Also return the user's current vote status
        // If we toggled off, current vote is null/0. If updated/inserted, match input.
        // Re-fetching or deducing:
        // Actually simpler to just deduce:
        // But let's re-fetch the vote status to be sure? No, existingVote + logic is enough.
        // But let's return the simplified "userVote" (-1, 0, 1) path.

        const finalVote = await db.query.workflowVotes.findFirst({
            where: and(
                eq(workflowVotes.workflowId, workflowId),
                eq(workflowVotes.userId, userId)
            ),
        });

        return NextResponse.json({
            success: true,
            upvotes: updatedWorkflow?.upvotes ?? 0,
            downvotes: updatedWorkflow?.downvotes ?? 0,
            userVote: finalVote?.voteType ?? 0
        });

    } catch (error) {
        console.error('Vote error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
