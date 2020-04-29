import request from '@/utils/request';
import { TableListParams } from './data';
import constants from '@/utils/constants';

export async function list(params: TableListParams) {
  return request(`${constants.baseUrl}/storage_plugin/list`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function setting(params: TableListParams) {
  return request(`${constants.baseUrl}/storage_plugin/${params.url}`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function install(params: TableListParams) {
  return request(`${constants.baseUrl}/storage_plugin/${params.url}`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function uninstall(params: TableListParams) {
  return request(`${constants.baseUrl}/storage_plugin/${params.url}`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function update(params: TableListParams) {
  return request(`${constants.baseUrl}/storage_plugin/${params.plugin}/update`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
