import * as constants from './constants';
import fetch from '../../../utils/axios.config';
// import axios from 'axios';
import { message } from 'antd';

export const changeBirthdayList = payload => ({
  type: constants.BIRTHDAY_DETAIL,
  payload
});

export const changeRejularList = payload => ({
  type: constants.REGULAR_DETAIL,
  payload
});

export const changeFieldList = payload => ({
  type: constants.FIELD_DETAIL,
  payload
});

export const changeReminderList = payload => ({
  type: constants.REMINDER_DETAIL,
  payload
});

export const changeMyToDoProjectList = payload => ({
  type: constants.MYTOPROJECT_DETAIL,
  payload
});

export const changeMyToDoEducationList = payload => ({
  type: constants.MYTOEDUCATION_DETAIL,
  payload
});

export const changeInterviewResumeData = payload => ({
  type: constants.CHANGE_INTERVIEWRESUME,
  payload
});

export const changeDistributionResumeData = payload => ({
  type: constants.CHANGE_DISTRIBUTIONRESUME,
  payload
});

export const changeInterviewRejularData = payload => ({
  type: constants.CHANGE_INTERVIEWREJULARLIST,
  payload
});

//获取生日列表
export const getBirthdayList = () => {
  return dispatch => {
    fetch
      .get('/api/home/queryEmployeeBirthdayCountByMonth.json', {
        params: {
          pageSize: 3,
          currentPage: 1
        }
      })
      .then(res => {
        if (res && res.success) {
          const { data } = res;
          dispatch(changeBirthdayList(data));
        } else {
          message.error('获取列表失败');
        }
      })
      .catch(err => {
        if (err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//获转正列表
export const getRejularList = payload => {
  return dispatch => {
    fetch
      .get('api/home/queryWillRegularEmployee.json', {
        params: payload
      })
      .then(res => {
        if (res && res.success) {
          const { data } = res;
          const arg0 = {
            data: data.data,
            regularTotal: data.total
          };
          dispatch(changeRejularList(arg0));
        } else {
          message.error('获取列表失败');
        }
      })
      .catch(err => {
        if (err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//获取场地人数列表
export const getFieldList = payload => {
  return dispatch => {
    fetch
      .get('/api/home/queryAreaEmployeeCount.json', {
        params: {
          payload
        }
      })
      .then(res => {
        if (res && res.success) {
          const { data } = res;
          const arg0 = {
            data: data.data,
            fieldTotal: data.total
          };
          dispatch(changeFieldList(arg0));
        } else {
          message.error('获取列表失败');
        }
      })
      .catch(err => {
        if (err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//获取入职离职列表
export const getReminderList = () => {
  return dispatch => {
    fetch
      .get('/api/home/queryEmployeeCountByMonthAndStatus.json')
      .then(res => {
        if (res && res.success) {
          const { data } = res;
          dispatch(changeReminderList(data));
        } else {
          message.error('获取列表失败');
        }
      })
      .catch(err => {
        if (err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//查询项目待办事项
export const queryMyToDoProject = () => {
  return dispatch => {
    fetch
      .get('/api/home/queryMyToDoProject.json')
      .then(res => {
        if (res && res.success) {
          const { data } = res;
          dispatch(changeMyToDoProjectList(data));
        } else {
          message.error('获取列表失败');
        }
      })
      .catch(err => {
        if (err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//查询项目待办事项
export const queryMyToDoEducation = () => {
  return dispatch => {
    fetch
      .get('/api/home/queryMyToDoEducation.json')
      .then(res => {
        if (res && res.success) {
          const { data } = res;
          dispatch(changeMyToDoEducationList(data));
        } else {
          message.error('获取列表失败');
        }
      })
      .catch(err => {
        if (err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//首页查询待分配简历
export const queryMyToDoAssignationInterview = () => {
  return dispatch => {
    fetch
      .get('/api/audition/home/queryMyToDoAssignationInterview.json')
      .then(res => {
        if (res && res.success) {
          console.log('res', res);

          dispatch(changeDistributionResumeData(res.data));
        } else {
          message.error('出错了，请稍后再试');
        }
      })
      .catch(err => {
        if (err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//首页查询待面试
export const queryMyToDoInterview = () => {
  return dispatch => {
    fetch
      .get('/api/audition/home/queryMyToDoInterview.json')
      .then(res => {
        if (res && res.success) {
          dispatch(changeInterviewResumeData(res.data));
        } else {
          message.error('出错了，请稍后再试');
        }
      })
      .catch(err => {
        if (err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};

//面试提醒
export const queryResumeWillRelease = payload => {
  return dispatch => {
    fetch
      .get('/api/audition/home/queryResumeWillRelease.json', {
        params: payload
      })
      .then(res => {
        if (res && res.success) {
          const { data } = res;
          console.log('data', data);
          const arg0 = {
            data: data.data ? data.data : [],
            total: data.total
          };

          dispatch(changeInterviewRejularData(arg0));
        } else {
          message.error('出错了，请稍后再试');
        }
      })
      .catch(err => {
        if (err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};
