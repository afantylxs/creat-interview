import * as constants from './constants';

const defaultState = {
  projectVisible: false,
  projectRecord: {},
  buList: [],
  depList: [],
  projectDataList: [],
  total: 1,
  firstCategoryidList: [],
  secondCategoryidList: [],
  thirdCategoryidList: [],
  aliGradeCodeList: [],
  workCityList: []
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGE_PROJECTVISIBLE:
      return {
        ...state,
        projectVisible: payload.projectVisible,
        projectRecord: payload.record
      };
    case constants.CHANGE_BULIST:
      return {
        ...state,
        buList: payload
      };
    case constants.CHANGE_DEPLIST:
      return {
        ...state,
        depList: payload
      };
    case constants.CHANGE_PROJECTDATALIST:
      return {
        ...state,
        projectDataList: payload.data,
        total: payload.total
      };
    case constants.CHANGE_FIRSTCATEGORYID:
      return {
        ...state,
        firstCategoryidList: payload
      };
    case constants.CHANGE_SECONDCATEGORYID:
      return {
        ...state,
        secondCategoryidList: payload
      };
    case constants.CHANGE_THIRDCATEGORYID:
      return {
        ...state,
        thirdCategoryidList: payload
      };
    case constants.CHANGE_ALIGRADECODE:
      return {
        ...state,
        aliGradeCodeList: payload
      };
    case constants.CHANGE_WORKCITY:
      return {
        ...state,
        workCityList: payload
      };
    default:
      return state;
  }
};
