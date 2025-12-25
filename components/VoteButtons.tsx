
'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoteButtonsProps {
    workflowId: string;
    initialUpvotes: number;
    initialDownvotes: number;
    initialUserVote?: number;
    className?: string;
}

export function VoteButtons({
    workflowId,
    initialUpvotes,
    initialDownvotes,
    initialUserVote = 0,
    className
}: VoteButtonsProps) {
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [downvotes, setDownvotes] = useState(initialDownvotes);
    const [userVote, setUserVote] = useState(initialUserVote);
    const [isLoading, setIsLoading] = useState(false);

    const handleVote = async (type: 1 | -1) => {
        if (isLoading) return;

        // Optimistic update
        const prevUpvotes = upvotes;
        const prevDownvotes = downvotes;
        const prevUserVote = userVote;

        let newUpvotes = upvotes;
        let newDownvotes = downvotes;
        let newUserVote = userVote;

        if (userVote === type) {
            // Toggle off
            newUserVote = 0;
            if (type === 1) newUpvotes--;
            else newDownvotes--;
        } else {
            // Change vote
            newUserVote = type;
            if (userVote === 1) newUpvotes--;
            else if (userVote === -1) newDownvotes--;

            if (type === 1) newUpvotes++;
            else newDownvotes++;
        }

        setUpvotes(newUpvotes);
        setDownvotes(newDownvotes);
        setUserVote(newUserVote);
        setIsLoading(true);

        try {
            const res = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workflowId, voteType: type })
            });

            if (res.status === 401) {
                // Not logged in
                // Revert
                setUpvotes(prevUpvotes);
                setDownvotes(prevDownvotes);
                setUserVote(prevUserVote);
                alert("Please login to vote");
                return;
            }

            if (!res.ok) {
                throw new Error('Failed to vote');
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = await res.json() as any;
            if (data.success) {
                setUpvotes(data.upvotes);
                setDownvotes(data.downvotes);
                setUserVote(data.userVote);
            }

        } catch (error) {
            // Revert
            setUpvotes(prevUpvotes);
            setDownvotes(prevDownvotes);
            setUserVote(prevUserVote);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("flex items-center gap-1 bg-muted/30 rounded-lg p-0.5", className)}>
            <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleVote(1); }}
                className={cn(
                    "p-1 hover:bg-muted/50 rounded-md transition-colors",
                    userVote === 1 && "text-green-500 hover:bg-green-500/10"
                )}
                disabled={isLoading}
            >
                <ChevronUp className="w-4 h-4" />
                <span className="sr-only">Upvote</span>
            </button>
            <span className={cn("text-xs font-bold px-1 min-w-[1.5em] text-center",
                userVote === 1 && "text-green-500",
                userVote === -1 && "text-red-500"
            )}>
                {upvotes - downvotes}
            </span>
            <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleVote(-1); }}
                className={cn(
                    "p-1 hover:bg-muted/50 rounded-md transition-colors",
                    userVote === -1 && "text-red-500 hover:bg-red-500/10"
                )}
                disabled={isLoading}
            >
                <ChevronDown className="w-4 h-4" />
                <span className="sr-only">Downvote</span>
            </button>
        </div>
    );
}
