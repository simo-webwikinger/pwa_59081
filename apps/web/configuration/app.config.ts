export const appConfiguration = {
  head: {
    viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
    htmlAttrs: {
      lang: process.env.DEFAULTLANGUAGE ?? 'en',
    },
    meta: [
      { name: 'shop-name', content: process.env.STORENAME || 'Hurricanes Shop' },
      { name: 'description', content: process.env.METADESC || 'Hurricanes Shop' },
      { name: 'keywords', content: process.env.METAKEYWORDS || 'Hurricanes,Shop' },
      { name: 'theme-color', content: '#0C7992' },
      { property: 'og:title', content: process.env.OGTITLE || 'Hurricanes Shop' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: process.env.OGIMAGE || '' },
      { property: 'og:url', content: process.env.API_ENDPOINT },
    ],
    link: [
      { rel: 'icon', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/favicon.png' },
    ],
    title: process.env.STORENAME || 'Hurricanes Shop',
  },
};
