export default {
  name: 'menu',
  path: '/system/menu',
  routes: [
    {
      path: '/system/menu',
      component: './system/menu',
    },
    {
      path: '/system/menu/add',
      name: 'add',
      hideInMenu: true,
      component: './system/menu/add',
    },
    {
      path: '/system/menu/edit/:id',
      name: 'edit',
      hideInMenu: true,
      component: './system/menu/add',
    },
  ],
};
