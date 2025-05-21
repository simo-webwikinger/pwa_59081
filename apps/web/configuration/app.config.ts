export const appConfiguration = {
  head: {
    viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
    htmlAttrs: {
      lang: process.env.DEFAULTLANGUAGE ?? 'en',
    },
    meta: [
      { name: 'shop-name', content: 'Startseite - Baltic-Hurricanes' },
      { name: 'description', content: process.env.METADESC || 'Startseite - Baltic-Hurricanes Shop' },
      { name: 'keywords', content: process.env.METAKEYWORDS || 'Startseite - Baltic-Hurricanes' },
      { name: 'theme-color', content: '#0C7992' },
      { property: 'og:title', content: process.env.OGTITLE || 'Startseite - Baltic-Hurricanes' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: process.env.OGIMAGE || '' },
      { property: 'og:url', content: process.env.API_ENDPOINT },
    ],
    link: [
      { rel: 'icon', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/favicon.png' },
    ],
    title: process.env.STORENAME || 'Startseite - Baltic-Hurricanes',
  },
};
