import * as constants from './constants';

const defaultState = {
  leaveVisible: false,
  leaveDataList: [],
  hrOneClassList: [],
  hrOneTypeList: [],
  busonlineTypeList: [],
  businessLeaveTypeList: [],
  ipsaLeaveReasonList: [],
  leaveTotal: 0,
  record: {},
  buList: [],
  depList: [],
  leaveProjList: [],
  currentPageData: {
    currentPage: 1,
    pageSize: 10,
    keyword: '',
    busOnlineFeedbackId: '',
    busOnlineFeedbackType: '',
    leaveOfficeStatus: '',
    leaveReasonId: '',
    hrOneMonthClass: '',
    hrOneMonthType: '',
    ipsaBuDeptId: '',
    ipsaDeptId: '',
    leaveProjReasonId: '',
    effectiveStartTimeFormat: '',
    effectiveEndTimeFormat: '',
    leaveProjStartTimeFormat: '',
    leaveProjEndTimeFormat: ''
  }
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGE_LEAVEVISIBLE:
      return {
        ...state,
        leaveVisible: payload.leaveVisible,
        record: payload.record
      };
    case constants.CHANGE_LEAVEDATALIST:
      return {
        ...state,
        leaveDataList: payload.data,
        leaveTotal: payload.total
      };
    case constants.CHANGE_HRONEMONTHCLASS:
      return {
        ...state,
        hrOneClassList: payload
      };
    case constants.CHANGE_HRONEMONTHTYPE:
      return {
        ...state,
        hrOneTypeList: payload
      };
    case constants.CHANGE_BUSONLINEFEEDBACKTYPE:
      return {
        ...state,
        busonlineTypeList: payload
      };
    case constants.CHANGE_BUSINESSLEAVETYPE:
      return {
        ...state,
        businessLeaveTypeList: payload
      };
    case constants.CHANGE_IPSALEAVEREASON:
      return {
        ...state,
        ipsaLeaveReasonList: payload
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
    case constants.CHANGE_LEAVEPROJ:
      return {
        ...state,
        leaveProjList: payload
      };
    case constants.CHANGE_PROJECTPAGE:
      return {
        ...state,
        currentPageData: payload
      };
    default:
      return state;
  }
};
