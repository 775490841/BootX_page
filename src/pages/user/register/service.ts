import request from '@/utils/request';
import constants from '@/utils/constants';

export interface LoginParamsType {
  username: string;
  password: string;
  captcha: string;
  captchaToken: string;
}

export async function register(params: LoginParamsType) {
  return request(`${constants.baseUrl}/register`, {
    method: 'POST',
    data: params,
  });
}
