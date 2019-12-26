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

export const changeEducList = payload => ({
  type: constants.CHANGE_EDUCLIST,
  payload
});

export const changeDircInfoList = payload => ({
  type: constants.CHANGE_MAGORLIST,
  payload
});

export const changeCurrentPageData = payload => ({
  type: constants.CHANGE_CURRENTPAGE,
  payload
});
//查询BU列表
export const deptInfoBu = payload => {
  return dispatch => {
    fetch
      .get('/api/deptInfo/bu')
      .then(res => {
        if (res.success) {
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

//获取学历信息列表
export const queryEducationRecordInfoList = payload => {
  return dispatch => {
    fetch
      .post('/api/education/queryEducationRecordInfoList.json', payload)
      .then(res => {
        if (res.success) {
          const educList = res.data.data;
          const total = res.data.total;
          dispatch(
            changeEducList({
              educList,
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

export const dictInfo = payload => {
  return dispatch => {
    fetch
      .get('/api/dictInfo/name', {
        params: {
          dictName: 'major_code'
        }
      })
      .then(res => {
        if (res.success) {
          const data = res.data;
          dispatch(changeDircInfoList(data));
          console.log('res', res);
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

export const updateEducationRecordInfoById = payload => {
  return dispatch => {
    fetch
      .post('/api/education/updateEducationRecordInfoById.json', payload)
      .then(res => {
        console.log('res', res);
        if (res.success) {
          const data = res.data;
          console.log('res', res);
        }
      })
      .catch(err => {
        console.log('猎豹err', err);
        if (err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了');
        }
      });
  };
};
