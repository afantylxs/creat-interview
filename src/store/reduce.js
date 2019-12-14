import { combineReducers } from 'redux';
import { reducer as basicRudecer } from '../page/BasicInformation/store/'
 const reducer = combineReducers({
    basic: basicRudecer
})

export default reducer