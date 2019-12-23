import * as constants from './constants';

const defaultState = {
  basicVisible: false,
  basicRecord: {},
  basicList: [],
  rsData: [],
  dmData: [],
  buList: [],
  depList: [],
  dicList: []
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
    case constants.RS_ROLE:
      return { ...state, rsData: payload };
    case constants.DM_ROLE:
      return { ...state, dmData: payload };
    case constants.CHANGE_BULIST:
      return { ...state, buList: payload };
    case constants.CHANGE_DEPLIST:
      return { ...state, depList: payload };
    case constants.CHANGE_DICLIST:
      return { ...state, dicList: payload };
    default:
      return state;
  }
};
