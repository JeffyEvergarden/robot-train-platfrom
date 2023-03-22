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
      courseName: '培训机器人' + index,
      courseStyle: Math.ceil(Math.random() * 2),
      courseType: Math.ceil(Math.random() * 2),
      point: Math.ceil(Math.random() * 40 + 60),
      creator: 'root',
    };
  });

  res.json({
    code: successCode,
    desc: '成功',
    data: {
      total: 11,
      list: data,
    },
  });
};

export default {
  // 获取课程信息
  [`GET ${baseUrl}/teacher/course/list`]: getNormalList,
};
