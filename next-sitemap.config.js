/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.webtoolscenter.com/',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    // Transform the URLs if needed
    transform: async (config, path) => {
      // Custom priority for different types of pages
      let priority = 0.7;
      
      // Home page gets highest priority
      if (path === '/') {
        priority = 1.0;
      }
      // Category pages get higher priority
      else if (path.match(/\/tools\/[^\/]+$/)) {
        priority = 0.8;
      }
      // Individual tool pages
      else if (path.match(/\/tools\/[^\/]+\/[^\/]+$/)) {
        priority = 0.7;
      }
      
      return {
        loc: path,
        changefreq: config.changefreq,
        priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs || [],
      }
    },
  }