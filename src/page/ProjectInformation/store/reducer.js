import * as constants from './constants';

const defaultState = {
  projectVisible: false,
  leaveProjVisible: false,
  projectRecord: {},
  leaveProjRecord: {},
  buList: [],
  depList: [],
  projectDataList: [],
  total: 1,
  firstCategoryidList: [],
  secondCategoryidList: [],
  thirdCategoryidList: [],
  aliGradeCodeList: [],
  workCityList: [],
  newProjectList: [],
  iframeList: [],
  careerGroupList: [],
  groupdeptList: [],
  careerdepList: [],
  deptIdList: [],
  saveSearchData: {},
  leaveProjList: [],
  thats: null,
  currentPageData: {
    currentPage: 1,
    pageSize: 10,
    aliNo: '',
    ipsaBuDeptId: '',
    ipsaDeptId: '',
    projectId: '',
    joiningProjTimeFormat: '',
    firstCategoryId: '',
    secondCategoryId: '',
    thirdJobId: '',
    aliGradeCode: '',
    techDirection: '',
    aliFrameId: '',
    careerGroupId: '',
    groupDeptId: '',
    careerDeptId: '',
    deptId: '',
    projetDurationType: '',
    projetType: '',
    iduFlag: '',
    tlFlag: '',
    workCity: '',
    workAddress: '',
    resourceStatus: '',
    backboneFlag: '',
    chargeFlag: '',
    keyword: '',
    businessLine: ''
  }
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
    case constants.CHANGE_LEAVEPROJVISIBLE:
      return {
        ...state,
        leaveProjVisible: payload.leaveProjVisible,
        leaveProjRecord: payload.record
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
    case constants.CHANGE_PROJECTPAGE:
      return {
        ...state,
        currentPageData: payload
      };
    case constants.CHANGE_NEWPROJECTDATALIST:
      return {
        ...state,
        newProjectList: payload
      };
    case constants.CHANGE_IFRAME:
      return {
        ...state,
        iframeList: payload
      };
    case constants.CHANGE_CAREERGROUP:
      return {
        ...state,
        careerGroupList: payload
      };
    case constants.CHANGE_GROUPDEPT:
      return {
        ...state,
        groupdeptList: payload
      };
    case constants.CHANGE_CAREERDEPT:
      return {
        ...state,
        careerdepList: payload
      };
    case constants.CHANGE_DEPTID:
      return {
        ...state,
        deptIdList: payload
      };
    case constants.CHANGE_SAVESEARCHSUBMIT:
      return {
        ...state,
        saveSearchData: payload
      };
    case constants.CHANGE_SAVESEARCHTHIS:
      return {
        ...state,
        thats: payload
      };
    case constants.CHANGE_LEAVEPROJ:
      return {
        ...state,
        leaveProjList: payload
      };
    default:
      return state;
  }
};
