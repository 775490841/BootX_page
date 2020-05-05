export default {
  name: 'permission',
  path: '/system/permission',
  routes: [
    {
      path: '/system/permission',
      component: './system/permission',
    },
    {
      path: '/system/permission/add',
      name: 'add',
      hideInMenu: true,
      component: './system/permission/add',
    },
    {
      path: '/system/permission/edit/:id',
      name: 'edit',
      hideInMenu: true,
      component: './system/permission/add',
    },
  ],
};
