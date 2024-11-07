import fs from 'fs';
import path from 'path';

// Use fs to read the JSON file synchronously
const jobsData = JSON.parse(fs.readFileSync('./src/data/jobs.json', 'utf-8'));

// Define your base routes, along with dynamic routes from the jobs data
const routes = [
  '/',
  '/all-government-jobs',
  '/all-internships',
  '/all-private-jobs',
  '/all-abroad-jobs',
  '/contact-us',
  '/about-us',
  ...jobsData.map(job => `/job-details/${job.id}`) // Dynamic job routes
];

// Function to generate the sitemap
const generateSitemap = () => {
  try {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map(
          (route) => `
        <url>
          <loc>https://www.reestart.in${route}</loc>
          <changefreq>daily</changefreq>
        </url>
      `
        )
        .join('')}
    </urlset>`;

    // Ensure the 'public' directory exists
    const sitemapPath = path.resolve('public', 'sitemap.xml');

    // Write the sitemap content to the file
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

// Call the function to generate the sitemap
generateSitemap();
