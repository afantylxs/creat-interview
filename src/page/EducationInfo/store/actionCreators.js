import * as constants from './constants';
import { message } from 'antd';
import fetch from '../../../utils/axios.config';

export const changeEducationVisible = payload => ({
  type: constants.CHANGE_EDUCATIONVISIBLE,
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

//查询BU列表
export const deptInfoBu = payload => {
  return dispatch => {
    fetch.get('/api/deptInfo/bu').then(res => {
      if (res.success) {
        const buList = res.data;
        dispatch(changeBuList(buList));
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
        if (res.success) {
          const depList = res.data;
          // if (payload.id) {
          //   dispatch(changeDepModalList(depList));
          // } else {
          //   dispatch(changeDepList(depList));
          // }
          dispatch(changeDepList(depList));
        }
      });
  };
};
