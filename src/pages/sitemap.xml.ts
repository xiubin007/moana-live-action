export const prerender = true;

export async function GET() {
  const site = 'https://moana-live-action.online';
  const now = new Date().toISOString().split('T')[0];

  const pages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/release-date', priority: '0.9', changefreq: 'weekly' },
    { url: '/cast', priority: '0.9', changefreq: 'weekly' },
    { url: '/trailers', priority: '0.9', changefreq: 'weekly' },
    { url: '/where-to-watch', priority: '0.8', changefreq: 'weekly' },
    { url: '/plot', priority: '0.7', changefreq: 'monthly' },
    { url: '/animated', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
    { url: '/contact', priority: '0.4', changefreq: 'yearly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${site}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
