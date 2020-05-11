import { Effect } from 'umi';
import { register } from './service';

export interface StateType {}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    register: Effect;
  };
}

const Model: ModelType = {
  namespace: 'userAndRegister',

  state: {},

  effects: {
    *register({ payload, callback }, { call }) {
      const response = yield call(register, payload);
      if (callback) {
        callback(response);
      }
    },
  },
};

export default Model;
