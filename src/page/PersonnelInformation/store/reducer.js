import * as constants from './constants';

const defaultState = {
  assignModalVisible: false,
  addModalvisible: false,
  editModalVisible: false,
  editRecord: {},
  detailsVisible: false,
  interviewerList: [],
  resourceMangeList: [],
  ownerList: [],
  leveList: [],
  typeList: [],
  projectList: [],
  assignList: [],
  assignTotal: 0,
  interviewList: [],
  interviewotal: 0,
  selectedRowKeys: [],
  detailsList: {},
  dispCurrentPage: 1,
  interCurrentPage: 1
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGE_ASSIGNMODALVISIBLE:
      return {
        ...state,
        assignModalVisible: payload.assignModalVisible
      };
    case constants.CHANGE_ADDMODALVISIBLE:
      return {
        ...state,
        addModalvisible: payload.addModalvisible
      };
    case constants.CHANGE_EDITMODALVISIBLE:
      return {
        ...state,
        editModalVisible: payload.editModalVisible,
        editRecord: payload.editRecord
      };
    case constants.CHANGE_DETAilSVISIBLE:
      return {
        ...state,
        detailsVisible: payload.detailsVisible
      };
    case constants.CHANGE_INTERVIEWERDATA:
      return {
        ...state,
        interviewerList: payload.data
      };
    case constants.CHANGE_RESOURCEMANGEDATA:
      return {
        ...state,
        resourceMangeList: payload.data
      };
    case constants.CHANGE_ASSIGNINTERVIEWLIST:
      return {
        ...state,
        assignList: payload.data,
        assignTotal: payload.total
      };
    case constants.CHANGE_QUERYINTERVIEWLIST:
      return {
        ...state,
        interviewList: payload.data,
        interviewotal: payload.total
      };
    case constants.CHANGE_OWNERRANGELIST:
      return {
        ...state,
        ownerList: payload.data
      };
    case constants.CHANGE_POSITIONLEVELIST:
      return {
        ...state,
        leveList: payload.data
      };
    case constants.CHANGE_POSITIONTYPELIST:
      return {
        ...state,
        typeList: payload.data
      };
    case constants.CHANGE_NEWPROJECTDATALIST:
      return {
        ...state,
        projectList: payload.data
      };
    case constants.CHANGE_SELECTEDROWKEYS:
      return {
        ...state,
        selectedRowKeys: payload
      };
    case constants.CHANGE_DATAILSLIST:
      return {
        ...state,
        detailsList: payload
      };
    case constants.CHANGE_CURRENTPAGE:
      return {
        ...state,
        dispCurrentPage: payload.dispCurrentPage,
        interCurrentPage: payload.interCurrentPage
      };
    default:
      return state;
  }
};
