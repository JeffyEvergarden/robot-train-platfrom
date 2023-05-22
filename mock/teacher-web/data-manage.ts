import { Request, Response } from 'express';
import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;
const gen = (num: number) => {
  return new Array(num).fill(0);
};

const taskReport = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      taskId: index,
      taskName: '任务名称' + index,
      taskUserCount: index,
      completeCount: index,
      completeRate: index + '%',
      timesAvg: index,
      scoreAvg: index,
      taskType: Math.floor(Math.random() * 2 + 1), //1-培训   2--考试
      taskStatus: Math.floor(Math.random() * 2), //0-关闭   1-开启
      creator: '创建人' + index,
      createTime: '2023-03-03 09:00:00',
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

const studentReport = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      account: index,
      userName: '学员名称' + index,
      groupId: index, //分组id
      groupName: '	分组名称' + index,
      taskCount: index,
      completeTaskCount: index,
      upCompleteTaskCount: index,
      trainTaskCount: index,
      completeProgress: index + '%',
      trainTimes: index,
      scoreAvg: index,
      createTime: '2023-03-03 09:00:00',
      completeExamCount: index,
      unCompleteExamCount: index,
      completeTrainCount: index,
      unCompleteTrainCount: index,
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

export default {
  [`POST ${baseUrl}/services/report/taskReport`]: taskReport,
  [`POST ${baseUrl}/services/report/studentReport`]: studentReport,
};
