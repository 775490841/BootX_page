import { Effect, Reducer } from 'umi';
import { list, setting, install, uninstall, update } from './service';

import { TableListItem } from './data';

export interface StateType {
  data: TableListItem[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    list: Effect;
    setting: Effect;
    uninstall: Effect;
    install: Effect;
    update: Effect;
  };
  reducers: {
    listInfo: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'storagePlugin',
  state: {
    data: [],
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(list, payload);
      yield put({
        type: 'listInfo',
        payload: response,
      });
    },
    *setting({ payload, callback }, { call }) {
      const response = yield call(setting, payload);
      if (callback) {
        callback(response);
      }
    },
    *uninstall({ payload, callback }, { call }) {
      const response = yield call(uninstall, payload);
      if (callback) {
        callback(response);
      }
    },
    *install({ payload, callback }, { call }) {
      const response = yield call(install, payload);
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

  reducers: {
    listInfo(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

export default Model;
