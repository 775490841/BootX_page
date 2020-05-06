import request from '@/utils/request';
import constants from '@/utils/constants';

export async function queryCurrent() {
  return request(`${constants.baseUrl}/currentUser`, {
    method: 'POST',
  });
}

export async function queryFakeList(params: { count: number }) {
  return request('/api/fake_list', {
    params,
  });
}
