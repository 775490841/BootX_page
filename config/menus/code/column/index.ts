export default {
  name: 'column',
  path: '/code/column',
  routes: [
    {
      path: '/code/column',
      component: './code/column',
    },
    {
      path: '/code/column/add',
      name: 'add',
      hideInMenu: true,
      component: './code/column/add',
    },
    {
      path: '/code/column/edit/:id',
      name: 'edit',
      hideInMenu: true,
      component: './code/column/add',
    },
  ],
};
