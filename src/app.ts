import constants from '@/utils/constants';
import { setSiteInfo } from '@/utils/common';
import { message } from 'antd';
import dynamic from 'dva/dynamic';

let authRoutes = [];

function buildRoutes(authRoutes1) {
  return (authRoutes1 || []).map((item) => {
    if (item.children && item.children.length > 0) {
      return {
        path: item.url,
        name: item.menuKey,
        routes: buildRoutes(item.children),
      };
    }
    return {
      path: item.url,
      name: item.menuKey,
      component: dynamic({ component: () => import(`@/pages${item.component}`) }),
    };
  });
}

/**
 * 修改路由。通常和 render 配置配合使用，请求服务端根据响应动态更新路由，
 * @param routes
 */
export function patchRoutes({ routes }) {
  // 清空左侧路由
  // routes[0].routes[1].routes.splice(0,100);

  buildRoutes(authRoutes).forEach((item) => {
    routes[0].routes[1].routes.push(item);
  });
}

export function render(oldRender: any) {
  fetch(`${constants.baseUrl}/auth_routes`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    credentials: 'include',
    method: 'POST',
  })
    .then((res) => {
      if (res.status === 999) {
        message.error('获取菜单失败！！');
        return {
          menus: [],
        };
      }
      return res.json();
    })
    .then(
      (data: { [key: string]: any }) => {
        authRoutes = data.menus;
        oldRender();
      },
      () => oldRender(),
    );

  // 系统配置信息
  fetch(`${constants.baseUrl}/setting/edit`, {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => setSiteInfo(data));
}
