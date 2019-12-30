import * as constants from './constants';
import { message } from 'antd';
import fetch from '../../../utils/axios.config';

export const changeProjectVisible = payload => ({
  type: constants.CHANGE_PROJECTVISIBLE,
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

export const changeProjectDataList = payload => ({
  type: constants.CHANGE_PROJECTDATALIST,
  payload
});
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
        if (err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了');
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
        if (err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了');
        }
      });
  };
};

//查询项目列表接口
export const queryProjectRecordInfoList = payload => {
  return dispatch => {
    fetch
      .post('/api/project/queryProjectRecordInfoList.json', {
        currentPage: 1,
        pageSize: 10
      })
      .then(res => {
        if (res && res.success && res.data) {
          console.log('res', res);
          const { data, total } = res.data;
          dispatch(
            changeProjectDataList({
              data,
              total
            })
          );
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
