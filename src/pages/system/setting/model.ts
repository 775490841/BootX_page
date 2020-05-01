import { Effect } from 'umi';
import { edit, update } from './service';

import { SettingConfig } from './data';

export interface StateType {
  data: SettingConfig;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    edit: Effect;
    update: Effect;
  };
}

const Model: ModelType = {
  namespace: 'setting',
  state: {
    data: {},
  },

  effects: {
    *edit({ payload, callback }, { call }) {
      const response = yield call(edit, payload);
      if (callback) {
        callback(response);
      }
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(update, payload);
      if (callback) {
        callback(response);
      }
    },
  },
};

export default Model;
