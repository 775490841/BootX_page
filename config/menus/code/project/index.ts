export default {
  name: 'project',
  path: '/code/project',
  routes: [
    {
      path: '/code/project',
      component: './code/project',
    },
    {
      path: '/code/project/add',
      name: 'add',
      hideInMenu: true,
      component: './code/project/add',
    },
    {
      path: '/code/project/edit/:id',
      name: 'edit',
      hideInMenu: true,
      component: './code/project/add',
    },
  ],
};
