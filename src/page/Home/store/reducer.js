import * as constants from './constants';

const defaultState = {
  serachValue: '',
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGEVALUE:
      return {
        ...state,
        serachValue: payload,
      };

    default:
      return state;
  }
};
