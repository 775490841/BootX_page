import { AnyAction, Reducer } from 'umi';
import { EffectsCommandMap } from 'dva';
import { list, save, tree, edit, remove } from './service';

import { TableListItem } from './data.d';
import { TableListData } from '@/pages/system/post/data';

export interface StateType {
  data?: TableListData;
  value?: TableListItem;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    list: Effect;
    save: Effect;
    tree: Effect;
    edit: Effect;
    remove: Effect;
  };
  reducers: {
    listInfo: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'post',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(list, payload);
      yield put({
        type: 'listInfo',
        payload: response,
      });
    },
    *save({ payload, callback }, { call }) {
      const response = yield call(save, payload);
      if (callback) {
        callback(response);
      }
    },
    *tree({ payload, callback }, { call }) {
      const response = yield call(tree, payload);
      if (callback) {
        callback(response);
      }
    },
    *edit({ payload, callback }, { call }) {
      const response = yield call(edit, payload);
      if (callback) {
        callback(response);
      }
    },
    *remove({ payload, callback }, { call }) {
      const response = yield call(remove, payload);
      if (callback) {
        callback(response);
      }
    },
  },

  reducers: {
    listInfo(state, action) {
      const { data = [], total = 0, current = 1, pageSize = 0 } = action.payload;
      return {
        ...state,
        data: {
          list: data,
          pagination: {
            current,
            pageSize,
            total,
          },
        },
      };
    },
  },
};

export default Model;
