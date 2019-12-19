import * as constants from './constants';

const defaultState = {
  projectVisible: false,
  projectRecord: {}
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
    default:
      return state;
  }
};
