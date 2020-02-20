import * as constants from './constants';
import { message } from 'antd';
import fetch from '../../../utils/axios.config';

export const changeKpiWeekLeaveDataAnalysis = payload => ({
  type: constants.CHANGE_KPIWEEKLEAVEDATAANALYSIS,
  payload
});

export const changeWeekEmployeeDataAnalysis = payload => ({
  type: constants.CHANGE_WEEKEMPLOYEEDATAANALYSIS,
  payload
});

export const changeKpiWeekJobTypeDataAnalysis = payload => ({
  type: constants.CHANGE_KPIWEEKJOBTYPEDATAANALYSIS,
  payload
});

//查询离职率
export const queryKpiWeekLeaveDataAnalysis = payload => {
  return dispatch => {
    fetch
      .get('/api/analysis/queryKpiWeekLeaveDataAnalysis.json', {
        params: {
          endTimeFormat: payload ? payload : ''
        }
      })
      .then(res => {
        if (res && res.success && res.data) {
          const kpiDataAnalysisInfo = res.data.kpiDataAnalysisInfo;
          dispatch(changeKpiWeekLeaveDataAnalysis(kpiDataAnalysisInfo));
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

//查询人力结构
export const queryKpiWeekEmployeeDataAnalysis = payload => {
  return dispatch => {
    fetch
      .get('/api/analysis/queryKpiWeekEmployeeDataAnalysis.json', {
        params: {
          endTimeFormat: payload ? payload : ''
        }
      })
      .then(res => {
        if (res && res.success && res.data) {
          const kpiDataAnalysisInfo = res.data.kpiDataAnalysisInfo;
          dispatch(changeWeekEmployeeDataAnalysis(kpiDataAnalysisInfo));
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

//查询人力结构
export const queryKpiWeekJobTypeDataAnalysis = payload => {
  return dispatch => {
    fetch
      .get('/api/analysis/queryKpiWeekJobTypeDataAnalysis.json', {
        params: {
          endTimeFormat: payload ? payload : ''
        }
      })
      .then(res => {
        if (res && res.success && res.data) {
          const kpiDataAnalysisInfo = res.data.kpiDataAnalysisInfo;
          const tableTitleInfo = res.data.tableTitleInfo;
          const newTableTitleInfo = [];
          tableTitleInfo &&
            tableTitleInfo.length &&
            tableTitleInfo.forEach(item => {
              newTableTitleInfo.push(
                Object.assign({}, item, { width: '120px' })
              );
            });
          dispatch(
            changeKpiWeekJobTypeDataAnalysis({
              newTableTitleInfo,
              kpiDataAnalysisInfo
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
