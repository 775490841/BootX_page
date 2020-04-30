// UUID
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
