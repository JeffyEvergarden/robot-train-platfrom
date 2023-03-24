import { Request, Response } from 'express';
import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;
const gen = (num: number) => {
  return new Array(num).fill(0);
};

const getNormalList = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      courseName: '课程' + index,
      courseStatus: Math.floor(Math.random() * 2),
      courseType: Math.floor(Math.random() * 2),
      passMark: Math.ceil(Math.random() * 40 + 60),
      creator: 'root',
      id: index,
    };
  });

  res.json({
    resultCode: successCode,
    resultDesc: '成功',
    data: {
      list: data,
      totalPage: 11,
    },
  });
};

const getNormalList2 = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      courseName: '课程' + index,
      courseStatus: Math.floor(Math.random() * 2),
      courseType: Math.floor(Math.random() * 2),
      passMark: Math.ceil(Math.random() * 40 + 60),
      creator: 'root',
      id: index,
    };
  });

  res.json({
    resultCode: successCode,
    resultDesc: '成功',
    data: data,
  });
};

const defaultResault = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    resultDesc: '成功',
  });
};

export default {
  // 获取课程信息
  [`POST ${baseUrl}/services/course/coursePage`]: getNormalList,
  [`POST ${baseUrl}/services/course/courseList`]: getNormalList2,
  [`POST ${baseUrl}/services/course/courseAdd`]: defaultResault,
  [`POST ${baseUrl}/services/course/courseEdit`]: defaultResault,
  [`POST ${baseUrl}/services/course/courseDelete`]: defaultResault,
  [`POST ${baseUrl}/services/course/courseDown`]: defaultResault,
  [`POST ${baseUrl}/services/course/coursePublish`]: defaultResault,
  [`POST ${baseUrl}/services/course/courseCopy`]: defaultResault,
};
