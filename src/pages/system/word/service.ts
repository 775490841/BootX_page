import request from '@/utils/request';
import constants from '@/utils/constants';
import { TableListParams } from './data.d';

export async function list(params: TableListParams) {
  return request(`${constants.baseUrl}/word/list`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function save(params: TableListParams) {
  if (params.id) {
    return request(`${constants.baseUrl}/word/update`, {
      method: 'POST',
      data: {
        ...params,
      },
    });
  }
  return request(`${constants.baseUrl}/word/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function edit(params: TableListParams) {
  return request(`${constants.baseUrl}/word/edit`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function remove(params: TableListParams) {
  return request(`${constants.baseUrl}/word/delete`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function enabled(params: TableListParams) {
  return request(`${constants.baseUrl}/word/enabled`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function disabled(params: TableListParams) {
  return request(`${constants.baseUrl}/word/disabled`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function wordTypeAll(params: TableListParams) {
  return request(`${constants.baseUrl}/word_type/all`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
