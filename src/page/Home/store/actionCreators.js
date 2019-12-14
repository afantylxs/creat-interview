import * as constants  from './constants'

export const changeIsLogin = payload => ({
    type: constants.CHANGE_ISLOGIN,
    payload,
})