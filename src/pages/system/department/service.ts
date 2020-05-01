import request from '@/utils/request';
import constants from '@/utils/constants';
import { TableListParams } from './data.d';

export async function list(params: TableListParams) {
  return request(`${constants.baseUrl}/department/list`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function save(params: TableListParams) {
  return request(`${constants.baseUrl}/department/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function tree(params: TableListParams) {
  return request(`${constants.baseUrl}/department/tree`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
