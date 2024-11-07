const fs = require('fs');
const path = require('path');
const jobsData = require('./src/data/jobs.json'); // Load your job data

const routes = [
  '/',
  '/all-government-jobs',
  '/all-internships',
  '/all-private-jobs',
  '/all-abroad-jobs',
  '/contact-us',
  '/about-us',
  ...jobsData.map(job => `/job-details/${job.id}`),
];

const generateSitemap = () => {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
      .map(
        (route) => `
      <url>
        <loc>https://reestart.in${route}</loc>
        <changefreq>daily</changefreq>
      </url>
    `
      )
      .join('')}
  </urlset>`;

  fs.writeFileSync(path.resolve(__dirname, 'public', 'sitemap.xml'), sitemapContent, 'utf8');
  console.log('Sitemap generated successfully!');
};

generateSitemap();
