const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 0.3 },
  { url: '/aboutus', changefreq: 'daily', priority: 0.3 },
  { url: '/contactus', changefreq: 'daily', priority: 0.3 },
  { url: '/terms', changefreq: 'daily', priority: 0.3 },
  { url: '/privacy', changefreq: 'daily', priority: 0.3 },
  { url: '/dashboard/shorturl', changefreq: 'daily', priority: 0.3 },
  { url: '/dashboard', changefreq: 'daily', priority: 0.3 },
  { url: '/dashboard/settings', changefreq: 'daily', priority: 0.3 },
  { url: '/dashboard/balance', changefreq: 'daily', priority: 0.3 },
  { url: '/dashboard/help', changefreq: 'daily', priority: 0.3 },
  { url: '/paid', changefreq: 'daily', priority: 0.3 },
  { url: '/cookies', changefreq: 'daily', priority: 0.3 },
  { url: '/:username/:shortenedUrl/r/:adIndex"', changefreq: 'daily', priority: 0.3 }
]

// Create a stream to write to
const stream = new SitemapStream({ hostname: 'https://www.linkamon.com' });

// Create a writable stream
const writeStream = fs.createWriteStream('./public/sitemap.xml');

// Pipe the sitemap stream to the writable stream
streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
  // Write sitemap to public directory
  writeStream.write(data.toString());
  writeStream.end();
}).catch((error) => {
  console.error('Error:', error);
});
