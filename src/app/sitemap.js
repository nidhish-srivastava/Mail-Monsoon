import { DOMAIN_URL } from "@/lib/util";

export default function robots() {
  return {
    rules: {
      userAgent: '*',  // User agents are seearch engine inedxing bots like that of google,apple,bing bots so we allow all of them
      allow: '/',
      disallow: [],
    },
    sitemap: `${DOMAIN_URL}/sitemap.xml`,
  }
}