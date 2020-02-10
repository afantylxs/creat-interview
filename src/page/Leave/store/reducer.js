import * as constants from './constants';

const defaultState = {
  educVisible: false,
  leaveList: []
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGE_BULIST:
      return {
        ...state,
        leaveList: payload
      };

    default:
      return state;
  }
};
