// import axios from 'axios';

export default {
  getSiteData: () => ({
    title: 'React Static'
  }),
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
