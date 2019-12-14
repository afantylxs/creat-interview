import * as constants  from './constants'

const defaultState = {
    basicVisible: false,
};

export default (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case constants.CHANGE_BASICVISIBLE:
            return { ...state, basicVisible: payload.basicVisible }
        default:
            return state;
    }
}