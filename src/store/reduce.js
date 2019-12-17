import { combineReducers } from 'redux';
import { reducer as homeReducer } from '../page/Home/store/index';
import { reducer as basicRudecer } from '../page/BasicInformation/store/';
const reducer = combineReducers({
  home: homeReducer,
  basic: basicRudecer
});

export default reducer;
