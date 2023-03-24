import { Request, Response } from 'express';
import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;
const gen = (num: number) => {
  return new Array(num).fill(0);
};

const getNormalList = (req: any, res: any) => {
  let data: any = gen(8).map((item: any, index: number) => {
    return {
      title: '培训机器人' + index,
      process: 0.75,
      finished: true,
    };
  });

  res.json({
    code: successCode,
    desc: '成功',
    data: {
      total: 10,
      list: data,
    },
  });
};

const getCourseInfo = (req: any, res: any) => {
  res.json({
    code: successCode,
    desc: '成功',
    data: {
      name: '新世纪福音战士',
      duration: 300,
    },
  });
};

export default {
  // 获取课程信息
  [`GET ${baseUrl}/student/course/list`]: getNormalList,
  [`GET ${baseUrl}/student/course/info`]: getCourseInfo,
};
