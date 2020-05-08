import request from '@/utils/request';
import constants from '@/utils/constants';
import { TableListParams } from './data.d';

export async function list(params: TableListParams) {
  return request(`${constants.projectUrl}/entity/list`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function save(params: TableListParams) {
  if (params.id) {
    return request(`${constants.projectUrl}/entity/update`, {
      method: 'POST',
      data: {
        ...params,
      },
    });
  }
  return request(`${constants.projectUrl}/entity/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function edit(params: TableListParams) {
  return request(`${constants.projectUrl}/entity/edit`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function remove(params: TableListParams) {
  return request(`${constants.projectUrl}/entity/delete`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function project(params: TableListParams) {
  return request(`${constants.projectUrl}/project/all`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function disabled(params: TableListParams) {
  return request(`${constants.projectUrl}/entity/disabled`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function enable(params: TableListParams) {
  return request(`${constants.projectUrl}/entity/enable`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
