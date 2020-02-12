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

//获取学历信息列表
export const queryEducationRecordInfoList = payload => {
  return dispatch => {
    fetch
      .post('/api/education/queryEducationRecordInfoList.json', payload)
      .then(res => {
        if (res && res.success) {
          const educList = res.data.data;
          const total = res.data.total;
          dispatch(
            changeEducList({
              educList,
              total
            })
          );
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

export const dictInfo = payload => {
  return dispatch => {
    fetch
      .get('/api/dictInfo/name', {
        params: {
          dictName: 'major_code'
        }
      })
      .then(res => {
        if (res && res.success) {
          const data = res.data;
          dispatch(changeDircInfoList(data));
        } else {
          message.error(res.message && res.message);
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

export const updateEducationRecordInfoById = payload => {
  return dispatch => {
    fetch
      .post('/api/education/updateEducationRecordInfoById.json', payload)
      .then(res => {
        if (res && res.success) {
          message.success('学历编辑成功');
          dispatch(
            changeEducationVisible({
              educVisible: false,
              record: {},
              imageUrl: []
            })
          );
          dispatch(
            queryEducationRecordInfoList({
              currentPage: 1,
              pageSize: 10
            })
          );
        } else {
          message.error('学历编辑失败：' + res.message && res.message);
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
