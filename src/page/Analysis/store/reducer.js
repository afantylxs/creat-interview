import * as constants from './constants';
import moment from 'moment';

const defaultState = {
  educVisible: false,
  buList: [],
  turnoverRateList: [],
  manpowerStructureList: [],
  tableTitleInfoList: [],
  workTypeList: [],
  wohleKpiList: [],
  wohleKpitableTitleInfoList: [],
  weeklyTotal: 1,
  weeklyDataList: [],
  weeklyYear: {
    year: moment().weekYear(),
    week: moment().week()
  },
  weeklyCityTotal: 1,
  weeklyCityDataList: [],
  weeklyCityYear: {
    year: moment().weekYear(),
    week: moment().week()
  },
  weeklyJobClassTotal: 1,
  weeklyJobClassList: [],
  weeklyJobClassYear: {
    year: moment().weekYear(),
    week: moment().week()
  }
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.CHANGE_KPIWEEKLEAVEDATAANALYSIS:
      return {
        ...state,
        turnoverRateList: payload
      };

    case constants.CHANGE_WEEKEMPLOYEEDATAANALYSIS:
      return {
        ...state,
        manpowerStructureList: payload
      };

    case constants.CHANGE_KPIWEEKJOBTYPEDATAANALYSIS:
      return {
        ...state,
        tableTitleInfoList: payload.kpiDataAnalysisInfo,
        workTypeList: payload.newTableTitleInfo
      };
    case constants.CHANGE_KPIWEEKKPIWHOLEDATAANALYSIS:
      return {
        ...state,
        wohleKpitableTitleInfoList: payload.newKpiDataAnalysisInfo,
        wohleKpiList: payload.newTableTitleInfo
      };
    case constants.CHANGE_QUERYEMPLOYEECOUNTBYDEPT:
      return {
        ...state,
        weeklyDataList: payload.weeklyDataList,
        weeklyTotal: payload.total
      };
    case constants.CHANGE_QUERYEMPLOYEECOUNTBYWORKCITY:
      return {
        ...state,
        weeklyCityDataList: payload.weeklyCityDataList,
        weeklyCityTotal: payload.total
      };
    case constants.CHANGE_QUERYEMPLOYEECOUNTBYJOBCLASS:
      return {
        ...state,
        weeklyJobClassList: payload.weeklyJobClassList,
        weeklyJobClassTotal: payload.total
      };
    case constants.CHANGE_WEEKLYYEAR:
      return {
        ...state,
        weeklyYear: payload
      };
    case constants.CHANGE_WEEKLYCITY:
      return {
        ...state,
        weeklyCityYear: payload
      };
    case constants.CHANGE_WEEKLYJOBCLASS:
      return {
        ...state,
        weeklyJobClassYear: payload
      };

    default:
      return state;
  }
};
