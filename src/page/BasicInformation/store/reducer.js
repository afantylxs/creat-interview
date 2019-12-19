import * as constants from './constants';

const defaultState = {
  basicVisible: false,
  basicRecord: {},
  basicList: []
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGE_BASICVISIBLE:
      return {
        ...state,
        basicVisible: payload.basicVisible,
        basicRecord: payload.record
      };
    case constants.CHANGE_BASICLIST:
      return { ...state, basicList: payload };
    default:
      return state;
  }
};
