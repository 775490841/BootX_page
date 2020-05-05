import request from '@/utils/request';
import constants from '@/utils/constants';
import { stringify } from 'qs';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  captchaToken: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request(`${constants.baseUrl}/login`, {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(params: { [key: string]: string }) {
  return request(`${constants.baseUrl}/captcha/image?${stringify(params)}`);
}
