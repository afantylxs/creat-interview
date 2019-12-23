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
        if (res.success) {
          const { data } = res;
          dispatch(changeBirthdayList(data));
        } else {
          message.error('获取列表失败');
        }
      });
  };
};

//获转正列表
export const getRejularList = () => {
  return dispatch => {
    fetch
      .get('api/home/queryWillRegularEmployee.json', {
        params: {
          pageSize: 3,
          currentPage: 1
        }
      })
      .then(res => {
        if (res.success) {
          const { data } = res;
          dispatch(changeRejularList(data.data));
        } else {
          message.error('获取列表失败');
        }
      });
  };
};

//获取场地人数列表
export const getFieldList = () => {
  return dispatch => {
    fetch
      .get('/api/home/queryAreaEmployeeCount.json', {
        params: {
          pageSize: 3,
          currentPage: 1
        }
      })
      .then(res => {
        if (res.success) {
          const { data } = res;
          dispatch(changeFieldList(data.data));
        } else {
          message.error('获取列表失败');
        }
      });
  };
};

//获取入职离职列表
export const getReminderList = () => {
  return dispatch => {
    fetch.get('/api/home/queryEmployeeCountByMonthAndStatus.json').then(res => {
      if (res.success) {
        const { data } = res;
        dispatch(changeReminderList(data));
      } else {
        message.error('获取列表失败');
      }
    });
  };
};
