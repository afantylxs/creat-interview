import * as constants from './constants';
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

export const queryEmployeeBaseInfoList = payload => {
  return dispatch => {
    fetch
      .post('/api/base/queryEmployeeBaseInfoList.json', {
        currentPage: 1,
        pageSize: 10
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

export const deptInfoBu = payload => {
  return dispatch => {
    fetch.get('/api/deptInfo/bu').then(res => {
      console.log('res', res);
    });
  };
};
