import * as constants from './constants';

const defaultState = {
  educVisible: false,
  buList: [],
  depList: []
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGE_EDUCATIONVISIBLE:
      return {
        ...state,
        educVisible: payload.educVisible
      };
    case constants.CHANGE_BULIST:
      return {
        ...state,
        buList: payload
      };
    case constants.CHANGE_DEPLIST:
      return {
        ...state,
        depList: payload
      };
    default:
      return state;
  }
};
