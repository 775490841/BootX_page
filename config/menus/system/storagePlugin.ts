export default {
  name: 'storagePlugin',
  path: '/system/storagePlugin',
  routes: [
    {
      path: '/system/storagePlugin',
      component: './system/plugin/storagePlugin',
    },
    {
      path: '/system/storagePlugin/ftp_storage/setting',
      name: 'ftpStorage',
      hideInMenu: true,
      component: './system/plugin/storagePlugin/ftpStorage',
    },
    {
      path: '/system/storagePlugin/local_storage/setting',
      name: 'localStorage',
      hideInMenu: true,
      component: './system/plugin/storagePlugin/localStorage',
    },
    {
      path: '/system/storagePlugin/oss_storage/setting',
      name: 'ossStorage',
      hideInMenu: true,
      component: './system/plugin/storagePlugin/ossStorage',
    },
  ],
};
