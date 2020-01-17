import { combineReducers } from 'redux';
import { reducer as homeReducer } from '../page/Home/store/index';
import { reducer as basicRudecer } from '../page/BasicInformation/store/';
import { reducer as projectRudecer } from '../page/ProjectInformation/store/';
import { reducer as educationRudecer } from '../page/EducationInfo/store/';
import { reducer as analysisRudecer } from '../page/Analysis/store/';
import { reducer as personnelRudecer } from '../page/PersonnelInformation/store/';
const reducer = combineReducers({
  home: homeReducer,
  basic: basicRudecer,
  project: projectRudecer,
  educ: educationRudecer,
  analysis: analysisRudecer,
  personnel: personnelRudecer
});

export default reducer;
