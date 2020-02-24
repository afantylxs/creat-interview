import * as constants from './constants';

const defaultState = {
  educVisible: false,
  buList: [],
  depList: [],
  educList: [],
  total: 1,
  majorList: [],
  educRecord: {},
  imageUrl: [],
  fileId: '',
  schoolTypeList: [],
  currentPageData: {
    currentPage: 1,
    pageSize: 10,
    keyword: '',
    ipsaDeptId: '',
    ipsaBuDeptId: '',
    uniformFlag: '',
    educationCode: ''
  }
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGE_EDUCATIONVISIBLE:
      return {
        ...state,
        educVisible: payload.educVisible,
        educRecord: payload.record,
        imageUrl: payload.imageUrl,
        fileId: payload.fileId
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
    case constants.CHANGE_EDUCLIST:
      return {
        ...state,
        educList: payload.educList,
        total: payload.total
      };
    case constants.CHANGE_MAGORLIST:
      return {
        ...state,
        majorList: payload
      };
    case constants.CHANGE_CURRENTPAGE:
      return {
        ...state,
        currentPageData: payload
      };
    case constants.CHANGE_SCHOOLTYPE:
      return {
        ...state,
        schoolTypeList: payload
      };
    default:
      return state;
  }
};
