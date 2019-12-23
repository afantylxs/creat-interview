import * as constants from './constants';
import { message } from 'antd';
import fetch from '../../../utils/axios.config';
import moment from 'moment';

export const changeBasicVisible = payload => ({
  type: constants.CHANGE_BASICVISIBLE,
  payload
});

export const changeBasicList = payload => ({
  type: constants.CHANGE_BASICLIST,
  payload
});

export const changeRsRoleData = payload => ({
  type: constants.RS_ROLE,
  payload
});

export const changeDmRoleData = payload => ({
  type: constants.DM_ROLE,
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

export const changeDicList = payload => ({
  type: constants.CHANGE_DICLIST,
  payload
});

//获取基础信息列表
export const queryEmployeeBaseInfoList = payload => {
  return dispatch => {
    fetch
      .post('/api/base/queryEmployeeBaseInfoList.json', {
        currentPage: 1,
        pageSize: 10,
        keyword: payload
      })
      .then(res => {
        if (res.success) {
          const basiclist = res.data.data;
          basiclist.forEach(item => {
            item.birthday = moment(item.birthday).format('YYYY-MM-DD');
            item.joiningDay = moment(item.joiningDay).format('YYYY-MM-DD');
          });
          dispatch(changeBasicList(basiclist));
        }
      });
  };
};

//新增基础信息
export const saveEmployeeBaseInfo = payload => {
  return dispatch => {
    fetch.post('/api/base/saveEmployeeBaseInfo.json', payload).then(res => {
      if (res.success) {
        dispatch(
          changeBasicVisible({
            basicVisible: false,
            record: {}
          })
        );
        dispatch(queryEmployeeBaseInfoList());
      }
    });
  };
};

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

//查询招聘顾问，交付经理和项目经理
export const queryUserListInfoByRolePermission = payload => {
  return dispatch => {
    fetch
      .get('/api/user/queryUserListInfoByRolePermission.json', {
        params: {
          permission: payload
        }
      })
      .then(res => {
        if (res.success) {
          const roleData = res.data;
          switch (payload) {
            case 'rs':
              dispatch(changeRsRoleData(roleData));
              break;
            case 'dm':
              dispatch(changeDmRoleData(roleData));
              break;
            default:
              break;
          }
        }
      })
      .catch(err => {
        message.error(err.data.message);
      });
  };
};

//搜索栏输入查询
export const searchEmployeeBaseInfoList = payload => {
  return dispatch => {
    fetch
      .get('/api/base/searchEmployeeBaseInfoList.json', {
        params: {
          currentPage: 1,
          pageSize: 10,
          keyword: payload
        }
      })
      .then(res => {
        if (res.success) {
          const basiclist = res.data.data;
          dispatch(changeBasicList(basiclist));
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
          pid: payload
        }
      })
      .then(res => {
        if (res.success) {
          const depList = res.data;
          dispatch(changeDepList(depList));
        }
      });
  };
};

//通用职位及id字典查询
export const dictInfo = payload => {
  return dispatch => {
    fetch
      .get('/api/dictInfo/name', {
        params: {
          dictName: payload
        }
      })
      .then(res => {
        console.log('res111', res);

        if (res.success) {
          const dicList = res.data;
          dispatch(changeDicList(dicList));
        }
      });
  };
};
