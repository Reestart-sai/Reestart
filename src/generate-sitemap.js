const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about-us', changefreq: 'monthly', priority: 0.5 },
  { url: '/contact-us', changefreq: 'monthly', priority: 0.5 },
  { url: '/all-private-jobs', changefreq: 'weekly', priority: 0.8 },
  { url: '/all-government-jobs', changefreq: 'weekly', priority: 0.8 },
  { url: '/all-internships', changefreq: 'weekly', priority: 0.8 },
  { url: '/all-abroad-jobs', changefreq: 'weekly', priority: 0.8 },
];

const sitemap = new SitemapStream({ hostname: 'https://www.reestarts.in' });

routes.forEach(route => sitemap.write(route));
sitemap.end();

streamToPromise(sitemap).then((xml) => {
  createWriteStream(path.join(__dirname, 'public', 'sitemap.xml')).write(xml);
});
