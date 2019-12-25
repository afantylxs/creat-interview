import * as constants from './constants';

const defaultState = {
  basicVisible: false,
  currentPageData: {
    currentPage: 1,
    pageSize: 10,
    keyword: '',
    ipsaBuDeptId: '',
    ipsaDeptId: '',
    gender: '',
    joiningDay: '',
    empProperty: '',
    joiningDayStartTime: '',
    joiningDayEndTime: '',
    deliveryManagerId: ''
  },
  basicRecord: {},
  basicList: [],
  rsData: [],
  dmData: [],
  buList: [],
  depList: [],
  dicList: [],
  dicModalList: [],
  manageList: [],
  gradeList: [],
  total: 1
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGE_BASICVISIBLE:
      return {
        ...state,
        basicVisible: payload.basicVisible,
        basicRecord: payload.record
      };
    case constants.CHANGE_BASICLIST:
      return { ...state, basicList: payload.basiclist, total: payload.total };
    case constants.RS_ROLE:
      return { ...state, rsData: payload };
    case constants.DM_ROLE:
      return { ...state, dmData: payload };
    case constants.CHANGE_BULIST:
      return { ...state, buList: payload };
    case constants.CHANGE_DEPLIST:
      return { ...state, depList: payload };
    case constants.CHANGE_DICLIST:
      return { ...state, dicList: payload };
    case constants.CHANGE_DEPMODALLIST:
      return { ...state, dicModalList: payload };
    case constants.CHANGE_MANAGELIST:
      return { ...state, manageList: payload };
    case constants.CHANGE_GRADELIST:
      return { ...state, gradeList: payload };
    case constants.CURRENTPAGEDATA:
      console.log('payload', payload);

      return { ...state, currentPageData: payload };
    default:
      return state;
  }
};
