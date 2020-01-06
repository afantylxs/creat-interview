import * as constants from './constants';
import { message } from 'antd';
import fetch from '../../../utils/axios.config';

export const changeProjectVisible = payload => ({
  type: constants.CHANGE_PROJECTVISIBLE,
  payload
});

export const changeLeaveProjVisible = payload => ({
  type: constants.CHANGE_LEAVEPROJVISIBLE,
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

export const changeFocusFirstCategoryId = payload => ({
  type: constants.CHANGE_FIRSTCATEGORYID,
  payload
});

export const changeFocusSecondCategoryId = payload => ({
  type: constants.CHANGE_SECONDCATEGORYID,
  payload
});

export const changeFocusThirdCategoryId = payload => ({
  type: constants.CHANGE_THIRDCATEGORYID,
  payload
});

export const changeFocusAliGradeCategoryId = payload => ({
  type: constants.CHANGE_ALIGRADECODE,
  payload
});

export const changeFocusWorkCity = payload => ({
  type: constants.CHANGE_WORKCITY,
  payload
});

export const changeCurrentPageData = payload => ({
  type: constants.CHANGE_PROJECTPAGE,
  payload
});

export const changeFocusProjectList = payload => ({
  type: constants.CHANGE_NEWPROJECTDATALIST,
  payload
});

export const changeFocusIframe = payload => ({
  type: constants.CHANGE_IFRAME,
  payload
});

export const changeCareerGroupId = payload => ({
  type: constants.CHANGE_CAREERGROUP,
  payload
});

export const changeGroupDeptId = payload => ({
  type: constants.CHANGE_GROUPDEPT,
  payload
});

export const changeCareerDeptId = payload => ({
  type: constants.CHANGE_CAREERDEPT,
  payload
});

export const changeDeptId = payload => ({
  type: constants.CHANGE_DEPTID,
  payload
});

export const changeSaveSearchSubmit = payload => ({
  type: constants.CHANGE_SAVESEARCHSUBMIT,
  payload
});

export const changeFocusLeaveProjList = payload => ({
  type: constants.CHANGE_LEAVEPROJ,
  payload
});

//存储搜索框里的this指针

export const handleSaveSearchThis = payload => ({
  type: constants.CHANGE_SAVESEARCHTHIS,
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
          pid: payload.value ? payload.value : ''
        }
      })
      .then(res => {
        if (res && res.success) {
          const depList = res.data;
          switch (payload.flag) {
            case 'aliFrameId':
              dispatch(changeCareerGroupId(depList));
              break;
            case 'zero':
              dispatch(changeFocusIframe(depList));
              break;
            case 'careerGroupId':
              dispatch(changeGroupDeptId(depList));
              break;
            case 'groupDeptId':
              dispatch(changeCareerDeptId(depList));
              break;
            case 'careerDeptId':
              dispatch(changeDeptId(depList));
              break;
            case 'bu':
              dispatch(changeDepList(depList));
              break;
            default:
              break;
          }
        } else {
          message.error('出错了');
        }
      })
      .catch(err => {
        if (err && err.data && err.data.message) {
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
      .post('/api/project/queryProjectRecordInfoList.json', payload)
      .then(res => {
        if (res && res.success && res.data) {
          const { data, total } = res.data;
          dispatch(
            changeProjectDataList({
              data,
              total
            })
          );
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

//获取框架
export const deptInfoIframe = payload => {
  return dispatch => {
    fetch
      .get('/api/deptInfo/frame', {
        params: {
          pid: payload.value
        }
      })
      .then(res => {
        if (res && res.success && res.data) {
          const { data } = res;
          switch (payload.flag) {
            case 'aliFrameId':
              dispatch(changeCareerGroupId(data));
              break;
            case 'zero':
              dispatch(changeFocusIframe(data));
              break;
            case 'careerGroupId':
              dispatch(changeGroupDeptId(data));
              break;
            case 'groupDeptId':
              dispatch(changeCareerDeptId(data));
              break;
            case 'careerDeptId':
              dispatch(changeDeptId(data));
              break;
            default:
              break;
          }
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

//字典查询
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
          const dicList = res.data;
          switch (payload) {
            case 'job_class_1':
              dispatch(changeFocusFirstCategoryId(dicList));
              break;
            case 'job_class_2':
              dispatch(changeFocusSecondCategoryId(dicList));
              break;
            case 'job_class_3':
              dispatch(changeFocusThirdCategoryId(dicList));
              break;
            case 'job_class_level':
              dispatch(changeFocusAliGradeCategoryId(dicList));
              break;
            case 'work_city':
              dispatch(changeFocusWorkCity(dicList));
              break;
            case 'project_list':
              dispatch(changeFocusProjectList(dicList));
              break;
            case 'leave_proj_reason':
              dispatch(changeFocusLeaveProjList(dicList));
              break;
            default:
              break;
          }
        } else {
          message.error('获取一类岗位失败');
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

//修改项目信息接口
export const updateProjectRecordInfoById = payload => {
  return dispatch => {
    fetch
      .post('/api/project/updateProjectRecordInfoById.json', payload)
      .then(res => {
        if (res && res.success) {
          message.success('编辑成功');
          dispatch(
            changeProjectVisible({
              projectVisible: false,
              record: {}
            })
          );
          dispatch(
            changeLeaveProjVisible({
              leaveProjVisible: false,
              record: {}
            })
          );
          dispatch(
            queryProjectRecordInfoList({
              currentPage: 1,
              pageSize: 10
            })
          );
        } else {
          message.error('提交失败：' + res.message);
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
