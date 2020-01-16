import * as constants from './constants';

const defaultState = {
  educVisible: false
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGE_EDUCATIONVISIBLE:
      return {
        ...state,
        educVisible: payload.educVisible
      };
    default:
      return state;
  }
};
