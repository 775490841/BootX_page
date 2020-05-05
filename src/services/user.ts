import request from '@/utils/request';
import constants from '@/utils/constants';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request(`${constants.baseUrl}/currentUser`, {
    method: 'POST',
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function menu(): Promise<any> {
  return request(`${constants.baseUrl}/auth_routes`, {
    method: 'POST',
  });
}
