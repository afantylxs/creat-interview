import * as constants  from './constants'

const defaultState = {
    isLogin: false,
};

export default (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGE_ISLOGIN':
            return { ...state, isLogin: payload.isLogin }
        default:
            return state;
    }
}