import * as constants from './constants';

const defaultState = {
  basicVisible: false,
  basicRecord: {}
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  console.log('reduce', payload);

  switch (type) {
    case constants.CHANGE_BASICVISIBLE:
      return {
        ...state,
        basicVisible: payload.basicVisible,
        basicRecord: payload.record
      };
    default:
      return state;
  }
};
