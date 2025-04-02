/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.webtoolscenter.com', // Removed trailing slash for consistency
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 1000, // Splits sitemap if more than 5,000 URLs
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '', // Ensures full site crawling (same as Allow: /)
      },
    ],
  },

  // Transform function for priority management
  transform: async (config, path) => {
    let priority = 0.7;

    if (path === '/') {
      priority = 1.0; // Home page gets highest priority
    } else if (path.match(/\/tools\/[^\/]+$/)) {
      priority = 0.8; // Category pages get higher priority
    } else if (path.match(/\/tools\/[^\/]+\/[^\/]+$/)) {
      priority = 0.7; // Individual tool pages
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs || [],
    };
  },
};
