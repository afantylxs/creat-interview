import { combineReducers } from 'redux';
import { reducer as homeReducer } from '../page/Home/store/index';
const reducer = combineReducers({
  home: homeReducer,
});

export default reducer;
