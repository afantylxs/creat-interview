import * as constants from './constants';
import { message } from 'antd';
import fetch from '../../../utils/axios.config';

export const changeAssignModalVisible = payload => ({
  type: constants.CHANGE_ASSIGNMODALVISIBLE,
  payload
});

export const changeAddModalVisible = payload => ({
  type: constants.CHANGE_ADDMODALVISIBLE,
  payload
});

export const changeEditModalVisible = payload => ({
  type: constants.CHANGE_EDITMODALVISIBLE,
  payload
});

export const changeDetailsModalVisible = payload => ({
  type: constants.CHANGE_DETAilSVISIBLE,
  payload
});

export const changeinterviewerList = payload => ({
  type: constants.CHANGE_INTERVIEWERDATA,
  payload
});

export const changeResourceMangerList = payload => ({
  type: constants.CHANGE_RESOURCEMANGEDATA,
  payload
});

export const changeAssignInterviewList = payload => ({
  type: constants.CHANGE_ASSIGNINTERVIEWLIST,
  payload
});

export const changeOwnerRangeList = payload => ({
  type: constants.CHANGE_OWNERRANGELIST,
  payload
});

export const changePositionLevelList = payload => ({
  type: constants.CHANGE_POSITIONLEVELIST,
  payload
});

export const changePositionTypeList = payload => ({
  type: constants.CHANGE_POSITIONTYPELIST,
  payload
});

export const changeFocusProjectList = payload => ({
  type: constants.CHANGE_NEWPROJECTDATALIST,
  payload
});

//获取面试官信息
export const queryUserListInfoByRolePermission = payload => {
  return dispatch => {
    fetch
      .get('/api/user/queryUserListInfoByRolePermission.json', {
        params: {
          permission: payload.value
        }
      })
      .then(res => {
        if (res && res.success && res.data) {
          const { data = [] } = res;
          switch (payload.key) {
            case 'assign':
              dispatch(
                changeinterviewerList({
                  data
                })
              );
              break;
            case 'add':
              dispatch(
                changeResourceMangerList({
                  data
                })
              );
              break;

            default:
              break;
          }
        } else {
          message.error('获取面试官失败');
        }
      })
      .catch(err => {
        if (err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了');
        }
      });
  };
};

//查询分配简历列表
export const queryAssignInterviewList = payload => {
  return dispatch => {
    fetch
      .post('/api/interview/queryAssignInterviewList.json', {
        ...payload
      })
      .then(res => {
        if (res && res.success && res.data) {
          const { data = [], total } = res;
          changeAssignInterviewList({ data, total });
          console.log('res', res);
        } else {
          message.error('列表获取失败' + res.message);
        }
      })
      .catch(err => {
        if (err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了');
        }
      });
  };
};

//新建简历
export const addInterview = payload => {
  return dispatch => {
    fetch
      .post('/api/interview/addInterview.json', {
        ...payload
      })
      .then(res => {
        if (res && res.success && res.data) {
          console.log('res', res);
        } else {
          message.error('列表获取失败' + res.message);
        }
      })
      .catch(err => {
        if (err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了');
        }
      });
  };
};

//面试新建简历来源
export const dictInfo = payload => {
  return dispatch => {
    fetch
      .get('/api/dictInfo/name?dictName= owner_range', {
        params: {
          dictName: payload
        }
      })
      .then(res => {
        if (res && res.success) {
          const { data = [] } = res;
          switch (payload.key) {
            case 'owner_range':
              dispatch(
                changeOwnerRangeList({
                  data
                })
              );
              break;
            case 'position_level':
              dispatch(
                changePositionLevelList({
                  data
                })
              );
              break;
            case 'position_type':
              dispatch(
                changePositionTypeList({
                  data
                })
              );
              break;
            case 'project_list':
              dispatch(changeFocusProjectList(data));
              break;

            default:
              break;
          }
        } else {
          message.error('获取面试官失败');
        }
      })
      .catch(err => {
        if (err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了');
        }
      });
  };
};
