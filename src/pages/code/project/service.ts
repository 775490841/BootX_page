import request from '@/utils/request';
import constants from '@/utils/constants';
import { TableListParams } from './data.d';

export async function list(params: TableListParams) {
  return request(`${constants.projectUrl}/project/list`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function save(params: TableListParams) {
  if (params.id) {
    return request(`${constants.projectUrl}/project/update`, {
      method: 'POST',
      data: {
        ...params,
      },
    });
  }
  return request(`${constants.projectUrl}/project/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function edit(params: TableListParams) {
  return request(`${constants.projectUrl}/project/edit`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function remove(params: TableListParams) {
  return request(`${constants.projectUrl}/project/delete`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
