import getMarkdown from './Boring/MDPlugin'

export default {
  getRoutes: async () => {
    const posts = await getMarkdown('./src/pages/blog')
    // console.log({posts})
    return [
      {
        path: '/',
        getData: () => ({posts}),
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
