import { combineReducers } from 'redux';
import { reducer as homeReducer } from '../page/Home/store/index';
import { reducer as basicRudecer } from '../page/BasicInformation/store/';
import { reducer as projectRudecer } from '../page/ProjectInformation/store/';
import { reducer as educationRudecer } from '../page/EducationInfo/store/';
const reducer = combineReducers({
  home: homeReducer,
  basic: basicRudecer,
  project: projectRudecer,
  educ: educationRudecer
});

export default reducer;
