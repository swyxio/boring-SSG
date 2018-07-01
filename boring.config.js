import axios from 'axios';

export default {
  getSiteData: () => ({
    title: 'React Static'
  }),
  getRoutes: async () => {
    // const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return [
      {
        path: '/'
      },
      {
        path: '/about'
      },
      {
        path: '/blog'
        // component: 'src/pages/Blog'
        // getData: () => ({
        //   posts
        // }),
        // children: posts.map(post => ({
        //   path: `/post/${post.id}`,
        //   component: 'src/pages/Post',
        //   getData: () => ({
        //     post
        //   })
        // }))
      }
    ];
  }
};
