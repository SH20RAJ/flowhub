import { getCurrentUser } from '@/lib/current-user';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ProfileContent } from './ProfileContent';

export const metadata: Metadata = {
    title: "My Settings",
    description: "Manage your Flowhub profile and account preferences.",
    robots: { index: false, follow: false },
};

export default async function ProfilePage() {
    const user = await getCurrentUser();
    if (!user) return notFound(); // Should be caught by middleware but safety first

    // Sanitize user object to remove functions (StackAuth User object has methods)
    // and only pass plain data to Client Component
    const secureUser = {
        id: user.id,
        dbUser: {
            name: user.dbUser?.name || null,
            username: user.dbUser?.username || null,
            bio: user.dbUser?.bio || null,
        }
    };

    return <ProfileContent user={secureUser} />;
}
