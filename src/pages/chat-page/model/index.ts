import { useState } from 'react';

import { GetCourseInfo_API, GetStepResult_API, postCall_API } from './api';
import config from '@/config';
import { message } from 'antd';

const { successCode } = config;

export const useChatModel = () => {
  const [resultLoading, setResultLoading] = useState<boolean>(false);

  const getCourseInfo = async (data?: any) => {
    let res: any = await GetCourseInfo_API(data);
    if (res.resultCode === successCode) {
      return res.data;
    } else {
      message.warning('获取课程信息失败');
      return {};
    }
  };

  const getStepResult = async (data?: any) => {
    setResultLoading(true);
    let res: any = await GetStepResult_API(data);
    setResultLoading(false);

    if (res.resultCode === successCode) {
      const data: any = res.data || {};

      // 成绩
      const score: any = data.score || 0;

      let scoreDetail: any = data.pointScoreList || [];
      scoreDetail = scoreDetail.map((item: any) => {
        return {
          name: item.deductModel,
          value: item.score,
        };
      });

      let deductPoints: any = data.pointsDeductionList || [];
      deductPoints = deductPoints.map((item: any) => ({
        name: item.deductPoint,
        value: item.deductScore,
      }));

      return {
        score,
        scoreDetail,
        deductPoints,
      };
    } else {
      message.warning('获取得分信息失败');
      return false;
    }
  };

  const postCall = async (data: any) => {
    let res: any = await postCall_API(data);
    if (res.resultCode === successCode) {
      return res.data?.sessionId;
    } else {
      return false;
    }
  };

  return {
    getCourseInfo,
    getStepResult,
    postCall,
    resultLoading,
  };
};
