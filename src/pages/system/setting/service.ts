import request from '@/utils/request';
import constants from '@/utils/constants';
import { SettingConfig } from './data';

export async function edit(params: SettingConfig) {
  return request(`${constants.baseUrl}/setting/edit`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function update(params: SettingConfig) {
  return request(`${constants.baseUrl}/setting/update`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
