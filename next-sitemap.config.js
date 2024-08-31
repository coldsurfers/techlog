/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  sitemapSize: 1000,
  exclude: ['/resume'],
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.SITE_URL}/server-sitemap.xml`],
    policies: [{ disallow: '/resume/', userAgent: '*', allow: '/' }],
  },
}
