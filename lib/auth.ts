import { stackServerApp } from '@/stack/server';
import { redirect } from 'next/navigation';

export async function requireAuth() {
    const user = await stackServerApp.getUser();
    if (!user) {
        redirect(stackServerApp.urls.signIn);
    }
    return user;
}

export const authActions = {
    async getSession() {
        return await stackServerApp.getUser();
    },
};
