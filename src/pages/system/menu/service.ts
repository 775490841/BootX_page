import request from '@/utils/request';
import constants from '@/utils/constants';
import { TableListParams } from './data.d';

export async function list(params: TableListParams) {
  return request(`${constants.baseUrl}/menu/list`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function save(params: TableListParams) {
  if (params.id) {
    return request(`${constants.baseUrl}/menu/update`, {
      method: 'POST',
      data: {
        ...params,
      },
    });
  }
  return request(`${constants.baseUrl}/menu/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function edit(params: TableListParams) {
  return request(`${constants.baseUrl}/menu/edit`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function remove(params: TableListParams) {
  return request(`${constants.baseUrl}/menu/delete`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function enabled(params: TableListParams) {
  return request(`${constants.baseUrl}/menu/enabled`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function disabled(params: TableListParams) {
  return request(`${constants.baseUrl}/menu/disabled`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function tree(params: TableListParams) {
  return request(`${constants.baseUrl}/menu/tree`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function add(params: TableListParams) {
  return request(`${constants.baseUrl}/menu/add`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
