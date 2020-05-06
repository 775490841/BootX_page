import request from '@/utils/request';
import constants from '@/utils/constants';

export async function queryCurrent() {
  return request(`${constants.baseUrl}/currentUser`);
}

export async function queryProvince() {
  return request('/api/geographic/province');
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}
