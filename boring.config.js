import getMarkdown from './Boring/MDPlugin';

export default {
  getData: async () => {
    const posts = await getMarkdown('./src/pages/blog');
    return {
      posts
    };
  },
  getRoutes: async () => {
    return [
      {
        path: '/'
      },
      {
        path: '/about'
      },
      {
        path: '/blog'
      }
    ];
  }
};
