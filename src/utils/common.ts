// UUID
import moment from 'moment';

const uuidChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
export const uuid = () => {
  let r;
  // eslint-disable-next-line no-shadow
  const uuid = [];
  // eslint-disable-next-line no-multi-assign
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
  uuid[14] = '4';

  for (let i = 0; i < 36; i += 1) {
    if (!uuid[i]) {
      // eslint-disable-next-line no-bitwise
      r = 0 | (Math.random() * 16);
      // eslint-disable-next-line no-bitwise
      uuid[i] = uuidChars[i === 19 ? (r & 0x3) | 0x8 : r];
    }
  }
  return uuid.join('');
};

export function setSiteInfo(siteInfo: { setting: {} }) {
  const { setting = {} } = siteInfo;
  localStorage.setItem('setting', JSON.stringify(setting || {}));
}

export function getSiteInfo(key?: string) {
  const settingStr = localStorage.getItem('setting');
  if (key) {
    return JSON.parse(settingStr || '{}')[`${key}`];
  }
  return JSON.parse(settingStr || '{}');
}

export function parseFormValues(values: { [key: string]: any }) {
  const result = {
    ...values,
  };
  if (result.rangeDate) {
    if (values.rangeDate[0]) {
      result.beginDate = moment(values.rangeDate[0]).format('YYYY-MM-DD 00:00:00');
    }
    if (values.rangeDate[1]) {
      result.endDate = moment(values.rangeDate[1]).format('YYYY-MM-DD 23:59:59');
    }
  }
  if (result.rangeDate1) {
    if (values.rangeDate1[0]) {
      result.beginDate1 = moment(values.rangeDate1[0]).format('YYYY-MM-DD 00:00:00');
    }
    if (result.rangeDate[1]) {
      result.endDate1 = moment(values.rangeDate1[1]).format('YYYY-MM-DD 23:59:59');
    }
  }
  delete result.rangeDate;
  delete result.rangeDate1;
  return result;
}
