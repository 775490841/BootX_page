import constants from '@/utils/constants';
import { setSiteInfo } from '@/utils/common';

export function render(oldRender: any) {
  oldRender();
  fetch(`${constants.baseUrl}/setting/edit`, {
    method: 'POST',
  })
    .then((res) => res.json())
    .then((data) => setSiteInfo(data));
}
