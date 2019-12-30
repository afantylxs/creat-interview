import * as constants from './constants';

const defaultState = {
  rejularList: [],
  birthdayList: [],
  fieldList: [],
  reminderList: {},
  myTodoList: [],
  myTodoeducationData: ''
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case constants.REGULAR_DETAIL:
      return { ...state, rejularList: payload };
    case constants.BIRTHDAY_DETAIL:
      return { ...state, birthdayList: payload };
    case constants.FIELD_DETAIL:
      return { ...state, fieldList: payload };
    case constants.REMINDER_DETAIL:
      return { ...state, reminderList: payload };
    case constants.MYTOPROJECT_DETAIL:
      return { ...state, myTodoList: payload };
    case constants.MYTOEDUCATION_DETAIL:
      return { ...state, myTodoeducationData: payload };
    default:
      return state;
  }
};
