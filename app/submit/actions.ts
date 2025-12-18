'use server';

import { db } from '@/db';
import { workflows } from '@/db/schema';
import { getCurrentUser } from '@/lib/current-user';
import { slugify } from '@/utils/slug';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export async function submitWorkflow(formData: FormData) {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const json = formData.get('json') as string;
    const difficulty = formData.get('difficulty') as string;
    // const tagsList = formData.get('tags') as string;

    if (!title || !json) {
        throw new Error('Title and JSON are required');
    }

    const slug = slugify(title) + '-' + Math.random().toString(36).substring(2, 7);
    const id = Math.random().toString(36).substring(2, 15); // Simple ID for now

    await db.insert(workflows).values({
        id,
        title,
        description,
        slug,
        json,
        difficulty,
        authorId: user.id,
        sourceType: 'community',
    });

    revalidatePath(ROUTES.WORKFLOWS);
    redirect(ROUTES.WORKFLOW_DETAIL(slug));
}
