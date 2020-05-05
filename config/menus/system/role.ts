export default {
  name: 'role',
  path: '/system/role',
  routes: [
    {
      path: '/system/role',
      component: './system/role',
    },
    {
      path: '/system/role/add',
      name: 'add',
      hideInMenu: true,
      component: './system/role/add',
    },
    {
      path: '/system/role/edit/:id',
      name: 'edit',
      hideInMenu: true,
      component: './system/role/add',
    },
  ],
};
