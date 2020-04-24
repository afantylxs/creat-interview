import * as constants from './constants';
import fetch from '../../../utils/axios.config';
import { message } from 'antd';

export const changeSearchInput = (payload) => ({
  type: constants.CHANGEVALUE,
  payload,
});
