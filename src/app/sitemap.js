export default function robots() {
  return {
    rules: {
      userAgent: '*',  // User agents are seearch engine inedxing bots like that of google,apple,bing bots so we allow all of them
      allow: '/',
      disallow: [],
    },
    sitemap: "https://mail-monsoon.vercel.app/sitemap.xml"
  }
}