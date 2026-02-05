const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://spice-workshop.github.io';
const OUTPUT_FILE = path.resolve(__dirname, '../public/sitemap.xml');

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/schedule', priority: '0.9', changefreq: 'weekly' },
  { path: '/talks', priority: '0.8', changefreq: 'weekly' },
  { path: '/participants', priority: '0.7', changefreq: 'weekly' },
  { path: '/logistics', priority: '0.6', changefreq: 'monthly' },
  { path: '/sightseeing', priority: '0.5', changefreq: 'monthly' }
];

const generateSitemap = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.path === '/' ? '/' : page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`✅ Sitemap component generated at ${OUTPUT_FILE}`);
};

generateSitemap();
