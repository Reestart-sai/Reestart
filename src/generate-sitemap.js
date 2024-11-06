const SitemapGenerator = require('react-sitemap-generator');

SitemapGenerator({
  url: 'https://reestarts.in', // Base URL of your website
  routes: [
    '/',
    '/about-us',
    '/contact-us',
    '/all-private-jobs',
    '/all-government-jobs',
    // Add other routes here
    '/all-internships',
    '/all-abroad-jobs'
  ],
});
