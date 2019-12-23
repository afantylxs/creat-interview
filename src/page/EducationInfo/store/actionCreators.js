import * as constants from './constants';
import { message } from 'antd';
import fetch from '../../../utils/axios.config';

export const changeEducationVisible = payload => ({
  type: constants.CHANGE_EDUCATIONVISIBLE,
  payload
});
