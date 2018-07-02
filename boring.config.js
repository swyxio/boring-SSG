import getMarkdown from './Boring/MDPlugin';

export default {
  getData: async () => {
    return {
      posts: await getMarkdown('./src/pages/blog'),
      about: await getMarkdown('./src/pages/about'),
      products: await getMarkdown('./src/pages/products')
    };
  },
  getRoutes: async ({ posts }) => {
    // SSR the individual blogposts using `posts`
    return [
      {
        path: '/'
      },
      {
        path: '/about'
      },
      {
        path: '/products'
      }
    ];
  }
};
