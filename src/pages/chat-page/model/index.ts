import { useState } from 'react';

import { GetCourseInfo_API } from './api';
import config from '@/config';
import { message } from 'antd';

const { successCode } = config;

export const useChatModel = () => {
  const getCourseInfo = async () => {
    let res: any = await GetCourseInfo_API();
    if (res.code === successCode) {
      return res.data;
    } else {
      message.warning('获取课程信息失败');
      return {};
    }
  };

  return {
    getCourseInfo,
  };
};
