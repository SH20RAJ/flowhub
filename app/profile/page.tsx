import { getCurrentUser } from '@/lib/current-user';
import { Title, Text, Avatar, Button, Input, Textarea } from 'rizzui';
import { notFound } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

export default async function ProfilePage() {
    const user = await getCurrentUser();
    if (!user) return notFound(); // Should be caught by middleware but safety first

    return (
        <div className="max-w-4xl mx-auto py-12 space-y-12 animate-in fade-in duration-700">
            <div className="space-y-4">
                <Title as="h1" className="text-4xl md:text-5xl font-black tracking-tighter">My Settings</Title>
                <Text className="text-muted-foreground text-lg font-medium leading-relaxed">
                    Manage your public profile and account preferences.
                </Text>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">
                    <section className="p-10 space-y-8 border-2 border-muted/30 rounded-[2.5rem] bg-card/30 backdrop-blur-xl shadow-2xl shadow-black/5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">Display Name</label>
                                <Input defaultValue={user.dbUser.name || ''} className="h-14 font-bold text-sm bg-background/50 border-muted/50 focus:border-primary transition-all rounded-2xl" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">Username</label>
                                <Input defaultValue={user.dbUser.username || ''} disabled className="h-14 font-bold text-sm bg-muted/50 border-muted/50 rounded-2xl opacity-60 cursor-not-allowed" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">Bio</label>
                                <Textarea defaultValue={user.dbUser.bio || ''} className="font-medium bg-background/50 border-muted/50 focus:border-primary transition-all rounded-2xl p-4" rows={4} />
                            </div>
                        </div>
                        <div className="pt-8 border-t border-muted/50">
                            <Button className="rounded-2xl px-12 h-14 font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform" disabled>Save Changes</Button>
                        </div>
                    </section>
                </div>

                <aside className="space-y-8">
                    <div className="p-8 space-y-8 border rounded-3xl bg-card/50 text-card-foreground shadow-2xl shadow-black/10 border-muted/50 backdrop-blur-md text-center">
                        <Avatar name={user.dbUser.name || 'User'} className="w-24 h-24 mx-auto ring-4 ring-primary/10 p-1" />
                        <div className="space-y-1">
                            <Title as="h3" className="text-xl font-black">{user.dbUser.name}</Title>
                            <Text className="text-xs font-black text-primary uppercase tracking-widest">@{user.dbUser.username}</Text>
                        </div>
                        <div className="pt-6 border-t border-muted/50 space-y-4 text-left">
                            <Title as="h3" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Account Verified</Title>
                            <div className="flex items-center gap-3 text-xs font-bold text-emerald-500">
                                <ShieldCheck className="w-4 h-4" />
                                <span>StackAuth Protected</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
