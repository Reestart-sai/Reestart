import fs from 'fs';
import path from 'path';

// Read the jobs data from the file
const jobsData = JSON.parse(fs.readFileSync('./src/data/jobs.json', 'utf-8'));

// Define static routes
const staticRoutes = [
  '/',
  '/all-government-jobs',
  '/all-internships',
  '/all-private-jobs',
  '/all-abroad-jobs',
  '/contact-us',
  '/about-us',
];

// Generate dynamic routes from the jobs data
const dynamicRoutes = jobsData.map(job => `/job-details/${job.id}`);

// Combine static and dynamic routes
const routes = [...staticRoutes, ...dynamicRoutes];

// Function to generate the sitemap
const generateSitemap = () => {
  try {
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

    // Ensure the 'public' directory exists, or create it
    const publicDir = path.resolve('public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write the sitemap content to the 'public/sitemap.xml' file
    const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

// Call the function to generate the sitemap
generateSitemap();
