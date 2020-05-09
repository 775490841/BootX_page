import request from '@/utils/request';
import constants from '@/utils/constants';
import { TableListParams } from './data.d';

export async function list(params: TableListParams) {
  return request(`${constants.baseUrl}/flow/model/list`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function save(params: TableListParams) {
  if (params.id) {
    return request(`${constants.baseUrl}/flow/model/update`, {
      method: 'POST',
      data: {
        ...params,
      },
    });
  }
  return request(`${constants.baseUrl}/flow/model/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function edit(params: TableListParams) {
  return request(`${constants.baseUrl}/flow/model/edit`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function remove(params: TableListParams) {
  return request(`${constants.baseUrl}/flow/model/delete`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function roleList(params: TableListParams) {
  return request(`${constants.baseUrl}/role/all`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function enabled(params: TableListParams) {
  return request(`${constants.baseUrl}/flow/model/enabled`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function disabled(params: TableListParams) {
  return request(`${constants.baseUrl}/flow/model/disabled`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function reset(params: TableListParams) {
  return request(`${constants.baseUrl}/flow/model/reset`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function permission(params: TableListParams) {
  return request(`${constants.baseUrl}/flow/model/permission`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function checkExport(params: TableListParams) {
  return request(`${constants.baseUrl}/flow/model/check_export`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function importSave(params: TableListParams) {
  return request(`${constants.baseUrl}/flow/model/import_save`, {
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

export async function add(params: TableListParams) {
  return request(`${constants.baseUrl}/flow/model/add`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
