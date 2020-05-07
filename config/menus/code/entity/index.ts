export default {
  name: 'entity',
  path: '/code/entity',
  routes: [
    {
      path: '/code/entity',
      component: './code/entity',
    },
    {
      path: '/code/entity/add',
      name: 'add',
      hideInMenu: true,
      component: './code/entity/add',
    },
    {
      path: '/code/entity/edit/:id',
      name: 'edit',
      hideInMenu: true,
      component: './code/entity/add',
    },
  ],
};
