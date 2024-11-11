import { MetadataRoute } from "next";
 
export default function robots(): MetadataRoute.Robots {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: [],
          allow: ['/dich-vu'],
          crawlDelay: 30
        },
      ],
      sitemap: 'https://photocopy99.com/sitemap.xml',
      host: 'https://photocopy99.com'
    }
}