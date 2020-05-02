// https://umijs.org/config/
import { defineConfig, utils } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { winPath } = utils; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV, GA_KEY } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  analytics: GA_KEY
    ? {
        ga: GA_KEY,
      }
    : false,
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          routes: [
            {
              name: 'system',
              path: '/system',
              routes: [
                {
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
                },
                {
                  name: 'setting',
                  icon: 'setting',
                  path: '/system/setting',
                  component: './system/setting',
                },

                {
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
                },
                {
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
                },

                {
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
                },
                {
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
                },
                {
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
                },
                {
                  name: 'word',
                  path: '/system/word',
                  routes: [
                    {
                      path: '/system/word',
                      component: './system/word',
                    },
                    {
                      path: '/system/word/add',
                      name: 'add',
                      hideInMenu: true,
                      component: './system/word/add',
                    },
                    {
                      path: '/system/word/edit/:id',
                      name: 'edit',
                      hideInMenu: true,
                      component: './system/word/add',
                    },
                  ],
                },
                {
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
                },
              ],
            },
            {
              name: 'index',
              icon: 'dashboard',
              path: '/index',
              component: './dashboard/analysis',
            },
            {
              path: '/',
              redirect: '/index',
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  // 禁用umi.js内置的 title 渲染机制
  title: false,
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }

        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
});
