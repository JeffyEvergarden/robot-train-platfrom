import { Request, Response } from 'express';
import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const gen = (num: number) => {
  return new Array(num).fill(0);
};

const learn = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      taskId: index,
      taskName: '课程名称' + index,
      courseId: index, //练习技巧id
      taskNodeName: '练习技巧名称' + index,
      taskNodeId: index,
      taskType: '1',
      score: '分数' + index,
      studyPass: '1',
      sourcePath: '录音路径',
      createTime: '2022-12-12',
    };
  });

  res.json({
    resultCode: successCode,
    resultDesc: '成功',
    data: {
      pageSize: 20,
      totalPage: 11,
      list: data,
    },
  });
};

const courseList = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      taskId: index,
      taskName: '课程名称' + index,
      courseId: index, //练习技巧id
      taskNodeName: '练习技巧名称' + index,
      taskNodeId: index,
      taskType: '1',
      score: '分数' + index,
      studyPass: '1',
      sourcePath: '录音路径',
      createTime: '2022-12-12',
    };
  });

  res.json({
    resultCode: successCode,
    resultDesc: '成功',
    data: data,
  });
};

export default {
  [`POST ${baseUrl}/ai-teach/services/stu/hitory/learn`]: learn,
  [`POST ${baseUrl}/ai-teach/services/stu/hitory/courseList`]: courseList,
};
