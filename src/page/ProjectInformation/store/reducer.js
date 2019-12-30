import * as constants from './constants';

const defaultState = {
  projectVisible: false,
  projectRecord: {},
  buList: [],
  depList: [],
  projectDataList: [],
  total: 1
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGE_PROJECTVISIBLE:
      return {
        ...state,
        projectVisible: payload.projectVisible,
        projectRecord: payload.record
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
    case constants.CHANGE_PROJECTDATALIST:
      return {
        ...state,
        projectDataList: payload.data,
        total: payload.total
      };
    default:
      return state;
  }
};
