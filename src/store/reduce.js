const defaultState = {
    isLogin: false,
    current: 'home',
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'change_islogin':
            return { ...state, isLogin: true }
            break;
        case 'change_selectedKeys':
            return { ...state, current: action.payload}
            break;
    
        default:
            return state;
            break;
    }
}