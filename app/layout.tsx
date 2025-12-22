import type { Metadata, Viewport } from "next";
import { StackAuthProvider } from "@/components/providers/StackAuthProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
	themeColor: "#000000",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export const metadata: Metadata = {
	metadataBase: new URL("https://flowhub.strivio.world"), // Replace with actual production URL
	title: {
		default: "Flowhub - n8n Workflow Sharing Platform",
		template: "%s | Flowhub",
	},
	description: "Discover, share, and deploy production-ready n8n workflows with the community.",
	keywords: ["n8n", "workflows", "automation", "low-code", "open-source", "devops"],
	authors: [{ name: "Flowhub Team" }],
	creator: "Flowhub Team",
	publisher: "Flowhub",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://flowhub.strivio.world",
		title: "Flowhub - n8n Workflow Sharing Platform",
		description: "Discover and share production-ready n8n workflows with the community.",
		siteName: "Flowhub",
		images: [
			{
				url: "/api/og?title=Flowhub&description=n8n Workflow Library",
				width: 1200,
				height: 630,
				alt: "Flowhub - n8n Workflow Sharing Platform",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Flowhub - n8n Workflow Sharing Platform",
		description: "Discover and share production-ready n8n workflows with the community.",
		images: ["/og-image.png"],
		creator: "@flowhub",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: "/favicon.svg",
		shortcut: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	manifest: "/manifest.json",
};

import { getCurrentUser } from '@/lib/current-user';

import { SchemaJSON } from '@/components/seo/SchemaJSON';

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Sync user with database if logged in
	await getCurrentUser();

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Flowhub',
		url: 'https://flowhub.strivio.world',
		logo: 'https://flowhub.strivio.world/logo.png',
		sameAs: [
			'https://twitter.com/striviohq',
			'https://github.com/strivio'
		],
		description: 'The community-driven library for n8n automation workflows.',
	};

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} antialiased font-sans`}>
				<SchemaJSON json={jsonLd} />
				<StackAuthProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<AppShell>
							{children}
						</AppShell>
					</ThemeProvider>
				</StackAuthProvider>
			</body>
		</html>
	);
}
