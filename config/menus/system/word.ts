export default {
  name: 'word',
  path: '/system/word',
  routes: [
    {
      path: '/system/word',
      component: './system/word',
    },
    {
      path: '/system/word/add',
      name: 'add',
      hideInMenu: true,
      component: './system/word/add',
    },
    {
      path: '/system/word/edit/:id',
      name: 'edit',
      hideInMenu: true,
      component: './system/word/add',
    },
  ],
};
