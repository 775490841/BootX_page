export default {
  name: 'wordType',
  path: '/system/wordType',
  routes: [
    {
      path: '/system/wordType',
      component: './system/wordType',
    },
    {
      path: '/system/wordType/add',
      name: 'add',
      hideInMenu: true,
      component: './system/wordType/add',
    },
    {
      path: '/system/wordType/edit/:id',
      name: 'edit',
      hideInMenu: true,
      component: './system/wordType/add',
    },
  ],
};
