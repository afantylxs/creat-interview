import * as constants from './constants';
import { message } from 'antd';
import fetch from '../../../utils/axios.config';

export const changeLeaveVisible = payload => ({
  type: constants.CHANGE_LEAVEVISIBLE,
  payload
});

export const changeLeaveDataList = payload => ({
  type: constants.CHANGE_LEAVEDATALIST,
  payload
});

export const changeHrOneMonthClass = payload => ({
  type: constants.CHANGE_HRONEMONTHCLASS,
  payload
});

export const changeHrOneMonthType = payload => ({
  type: constants.CHANGE_HRONEMONTHTYPE,
  payload
});

export const changebusOnlineFeedbackType = payload => ({
  type: constants.CHANGE_BUSONLINEFEEDBACKTYPE,
  payload
});

export const changeBusinessLeaveType = payload => ({
  type: constants.CHANGE_BUSINESSLEAVETYPE,
  payload
});

export const changeIpsaLeaveReason = payload => ({
  type: constants.CHANGE_IPSALEAVEREASON,
  payload
});

export const changeBuList = payload => ({
  type: constants.CHANGE_BULIST,
  payload
});

export const changeDepList = payload => ({
  type: constants.CHANGE_DEPLIST,
  payload
});

export const changeFocusLeaveProjList = payload => ({
  type: constants.CHANGE_LEAVEPROJ,
  payload
});

export const changeCurrentPageData = payload => ({
  type: constants.CHANGE_PROJECTPAGE,
  payload
});

//存储搜索框里的this指针
export const handleSaveSearchThis = payload => ({
  type: constants.CHANGE_SAVESEARCHTHIS,
  payload
});

//查询离职信息列表
export const queryEmployeeLeaveInfoList = payload => {
  return dispatch => {
    fetch
      .post('/api/leave/queryEmployeeLeaveInfoList.json', payload)
      .then(res => {
        if (res && res.success) {
          const { data, total } = res.data;
          dispatch(
            changeLeaveDataList({
              data,
              total
            })
          );
        } else {
          if (res.message) {
            message.error(res.message);
          } else {
            message.error('出错了,请稍后重试');
          }
        }
      })
      .catch(err => {
        if (err && err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//查询分类
export const dictInfo = payload => {
  return dispatch => {
    fetch
      .get('/api/dictInfo/name', {
        params: {
          dictName: payload
        }
      })
      .then(res => {
        if (res && res.success) {
          const data = res.data ? res.data : [];
          switch (payload) {
            case 'hr_leave_category':
              dispatch(changeHrOneMonthClass(data));
              break;
            case 'business_leave_category':
              dispatch(changebusOnlineFeedbackType(data));
              break;
            case 'ipsa_leave_reason':
              dispatch(changeIpsaLeaveReason(data));
              break;
            case 'leave_proj_reason':
              dispatch(changeFocusLeaveProjList(data));
              break;
            default:
              break;
          }
        } else {
          if (res.message) {
            message.error(res.message);
          } else {
            message.error('出错了,请稍后重试');
          }
        }
      })
      .catch(err => {
        if (err && err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//查询分类子集
export const dictInfoSon = payload => {
  return dispatch => {
    fetch
      .get('/api/dictInfo/name/pid', {
        params: {
          dictName: payload.name,
          pid: payload.pid
        }
      })
      .then(res => {
        if (res && res.success) {
          const data = res.data ? res.data : [];
          switch (payload.name) {
            case 'hr_leave_type':
              dispatch(changeHrOneMonthType(data));
              break;
            case 'business_leave_type':
              dispatch(changeBusinessLeaveType(data));
              break;
            default:
              break;
          }
        } else {
          if (res.message) {
            message.error(res.message);
          } else {
            message.error('出错了,请稍后重试');
          }
        }
      })
      .catch(err => {
        if (err && err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//新增离职信息
export const saveEmployeeLeaveInfo = payload => {
  return dispatch => {
    fetch
      .post('/api/leave/saveEmployeeLeaveInfo.json', payload)
      .then(res => {
        if (res && res.success) {
          message.success('新增成功');
          dispatch(
            changeLeaveVisible({
              leaveVisible: false,
              record: {}
            })
          );
          dispatch(queryEmployeeLeaveInfoList());
        } else {
          if (res.message) {
            message.error(res.message);
          } else {
            message.error('出错了,请稍后重试');
          }
        }
      })
      .catch(err => {
        if (err && err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//更新离职信息
export const updateEmployeeLeaveInfoById = payload => {
  return dispatch => {
    fetch
      .post('/api/leave/updateEmployeeLeaveInfoById.json', payload)
      .then(res => {
        if (res && res.success) {
          message.success('编辑成功');
          dispatch(
            changeLeaveVisible({
              leaveVisible: false,
              record: {}
            })
          );
          dispatch(queryEmployeeLeaveInfoList());
        } else {
          if (res.message) {
            message.error(res.message);
          } else {
            message.error('出错了,请稍后重试');
          }
        }
      })
      .catch(err => {
        if (err && err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//查询BU列表
export const deptInfoBu = payload => {
  return dispatch => {
    fetch
      .get('/api/deptInfo/bu')
      .then(res => {
        if (res && res.success) {
          const buList = res.data;
          dispatch(changeBuList(buList));
        } else {
          message.error('出错了');
        }
      })
      .catch(err => {
        if (err && err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//获取部门
export const deptInfo = payload => {
  return dispatch => {
    fetch
      .get('/api/deptInfo/pid', {
        params: {
          pid: payload.id ? payload.id : payload
        }
      })
      .then(res => {
        if (res && res.success) {
          const depList = res.data;
          dispatch(changeDepList(depList));
        }
      })
      .catch(err => {
        if (err && err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};
