const fs = require('fs');
const path = require('path');
const jobsData = require('./src/data/jobs.json'); // Load your job data

// Define your base routes, along with dynamic routes from the jobs data
const routes = [
  '/',
  '/all-government-jobs',
  '/all-internships',
  '/all-private-jobs',
  '/all-abroad-jobs',
  '/contact-us',
  '/about-us',
  ...jobsData.map(job => `/job-details/${job.id}`), // Dynamic job routes
];

// Function to generate the sitemap
const generateSitemap = () => {
  // Construct the XML content for the sitemap
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
      .map(
        (route) => `
      <url>
        <loc>https://www.reestart.in${route}</loc>
        <changefreq>daily</changefreq> <!-- You can adjust this based on page content -->
      </url>
    `
      )
      .join('')}
  </urlset>`;

  // Ensure the 'public' directory exists (you may need to adjust the path depending on your setup)
  const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');

  // Write the sitemap content to the file
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log('Sitemap generated successfully!');
};

// Call the function to generate the sitemap
generateSitemap();
