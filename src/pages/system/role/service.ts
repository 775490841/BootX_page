import request from '@/utils/request';
import constants from '@/utils/constants';
import { TableListParams } from './data.d';

export async function list(params: TableListParams) {
  return request(`${constants.baseUrl}/role/list`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function save(params: TableListParams) {
  if (params.id) {
    return request(`${constants.baseUrl}/role/update`, {
      method: 'POST',
      data: {
        ...params,
      },
    });
  }
  return request(`${constants.baseUrl}/role/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function edit(params: TableListParams) {
  return request(`${constants.baseUrl}/role/edit`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function remove(params: TableListParams) {
  return request(`${constants.baseUrl}/role/delete`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function enabled(params: TableListParams) {
  return request(`${constants.baseUrl}/role/enabled`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function disabled(params: TableListParams) {
  return request(`${constants.baseUrl}/role/disabled`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function departmentTree(params: TableListParams) {
  return request(`${constants.baseUrl}/department/tree`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function permission(params: TableListParams) {
  return request(`${constants.baseUrl}/role/permission`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updatePermission(params: TableListParams) {
  return request(`${constants.baseUrl}/role/update_permission`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
