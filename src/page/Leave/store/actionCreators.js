import * as constants from './constants';
import { message } from 'antd';
import fetch from '../../../utils/axios.config';

export const changeEducationVisible = payload => ({
  type: constants.CHANGE_EDUCATIONVISIBLE,
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
        if (err.data && err.data.message) {
          message.error(err.data.message);
        } else {
          message.error('出错了，请稍后再试');
        }
      });
  };
};
