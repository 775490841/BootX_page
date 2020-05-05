export default {
  name: 'admin',
  path: '/system/admin',
  routes: [
    {
      path: '/system/admin',
      component: './system/admin',
    },
    {
      path: '/system/admin/add',
      name: 'add',
      hideInMenu: true,
      component: './system/admin/add',
    },
    {
      path: '/system/admin/edit/:id',
      name: 'edit',
      hideInMenu: true,
      component: './system/admin/add',
    },
  ],
};
