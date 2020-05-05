export default {
  name: 'post',
  path: '/system/post',
  routes: [
    {
      path: '/system/post',
      component: './system/post',
    },
    {
      path: '/system/post/add',
      name: 'add',
      hideInMenu: true,
      component: './system/post/add',
    },
    {
      path: '/system/post/edit/:id',
      name: 'edit',
      hideInMenu: true,
      component: './system/post/add',
    },
  ],
};
