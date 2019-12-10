const defaultState = {
    isLogin: false,
};

export default (state = defaultState, action) => {
    console.log('action',action);
    
    switch (action.type) {
        case 'change_islogin':
            return { ...state, isLogin: true }
            break;
    
        default:
            return state;
            break;
    }
}