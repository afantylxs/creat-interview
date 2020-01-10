import * as constants from './constants';

const defaultState = {
  rejularList: [],
  birthdayList: [],
  fieldList: [],
  reminderList: {},
  myTodoList: [],
  interviewRejularList: [],
  distributionResume: 0,
  interviewResume: 0,
  myTodoeducationData: '',
  regularTotal: 1,
  fieldTotal: 1,
  interviewRejularTotal: 0
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.REGULAR_DETAIL:
      return {
        ...state,
        rejularList: payload.data,
        regularTotal: payload.regularTotal
      };
    case constants.BIRTHDAY_DETAIL:
      return { ...state, birthdayList: payload };
    case constants.FIELD_DETAIL:
      return {
        ...state,
        fieldList: payload.data,
        fieldTotal: payload.fieldTotal
      };
    case constants.CHANGE_INTERVIEWREJULARLIST:
      return {
        ...state,
        interviewRejularList: payload.data,
        interviewRejularTotal: payload.total
      };
    case constants.REMINDER_DETAIL:
      return { ...state, reminderList: payload };
    case constants.MYTOPROJECT_DETAIL:
      return { ...state, myTodoList: payload };
    case constants.MYTOEDUCATION_DETAIL:
      return { ...state, myTodoeducationData: payload };
    case constants.CHANGE_INTERVIEWRESUME:
      return { ...state, interviewResume: payload };
    case constants.CHANGE_DISTRIBUTIONRESUME:
      return { ...state, distributionResume: payload };
    default:
      return state;
  }
};
