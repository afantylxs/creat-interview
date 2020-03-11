import { combineReducers } from 'redux';
import { reducer as homeReducer } from '../page/Home/store/index';
import { reducer as personnelRudecer } from '../page/PersonnelInformation/store/';
const reducer = combineReducers({
  home: homeReducer,
  personnel: personnelRudecer
});

export default reducer;
