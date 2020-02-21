import * as constants from './constants';

const defaultState = {
  educVisible: false,
  buList: [],
  turnoverRateList: [],
  manpowerStructureList: [],
  tableTitleInfoList: [],
  workTypeList: [],
  wohleKpiList: [],
  wohleKpitableTitleInfoList: []
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

    default:
      return state;
  }
};
