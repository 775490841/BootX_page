import request from '@/utils/request';
import constants from '@/utils/constants';
import { TableListParams } from './data.d';

export async function list(params: TableListParams) {
  return request(`${constants.baseUrl}/admin/list`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function save(params: TableListParams) {
  if (params.id) {
    return request(`${constants.baseUrl}/admin/update`, {
      method: 'POST',
      data: {
        ...params,
      },
    });
  }
  return request(`${constants.baseUrl}/admin/save`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function edit(params: TableListParams) {
  return request(`${constants.baseUrl}/admin/edit`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function remove(params: TableListParams) {
  return request(`${constants.baseUrl}/admin/delete`, {
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
  return request(`${constants.baseUrl}/admin/enabled`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function disabled(params: TableListParams) {
  return request(`${constants.baseUrl}/admin/disabled`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function reset(params: TableListParams) {
  return request(`${constants.baseUrl}/admin/reset`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function permission(params: TableListParams) {
  return request(`${constants.baseUrl}/admin/permission`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function checkExport(params: TableListParams) {
  return request(`${constants.baseUrl}/admin/check_export`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function importSave(params: TableListParams) {
  return request(`${constants.baseUrl}/admin/import_save`, {
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
  return request(`${constants.baseUrl}/admin/add`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
