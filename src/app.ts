import { getAuthRoutes, siteInfo } from '@/utils/common';

import dynamic from 'dva/dynamic';

let authRoutes = [];

function buildRoutes(authRoutes1) {
  return (authRoutes1 || []).map((item) => {
    if (item.children && item.children.length > 0) {
      return {
        path: item.path,
        name: item.menuKey,
        routes: buildRoutes(item.children),
      };
    }
    return {
      path: item.path,
      name: item.menuKey,
      component: dynamic({ component: () => import(`@/pages${item.component || item.url}`) }),
    };
  });
}

/**
 * 修改路由。通常和 render 配置配合使用，请求服务端根据响应动态更新路由，
 * @param routes
 */
export function patchRoutes({ routes }) {
  console.log('denglu11111');
  // 清空左侧路由
  routes[0].routes[1].routes.splice(0, 100);
  console.log('aa', buildRoutes(authRoutes));
  buildRoutes(authRoutes).forEach((item) => {
    routes[0].routes[1].routes.push(item);
  });
}

/**
 * 该方法会在patchRoutes之前进行执行。
 * @param oldRender
 */
export function render(oldRender: any) {
  console.log('denglu222222222');
  // 权限路由。
  getAuthRoutes((data: { [key: string]: any }) => {
    authRoutes = data.menus;
    oldRender();
  });
  // 系统配置信息
  siteInfo();
}
