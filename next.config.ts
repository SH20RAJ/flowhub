import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	register: true,
});

const nextConfig: NextConfig = {
	/* config options here */
	serverExternalPackages: ["@libsql/client", "@libsql/hrana-client", "@libsql/isomorphic-ws"],
	transpilePackages: ["@stackframe/stack"],
};

export default withPWA(nextConfig);

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
