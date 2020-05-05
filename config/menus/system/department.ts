export default {
  name: 'department',
  path: '/system/department',
  routes: [
    {
      path: '/system/department',
      component: './system/department',
    },
    {
      path: '/system/department/add',
      name: 'add',
      hideInMenu: true,
      component: './system/department/add',
    },
    {
      path: '/system/department/edit/:id',
      name: 'edit',
      hideInMenu: true,
      component: './system/department/add',
    },
  ],
};
