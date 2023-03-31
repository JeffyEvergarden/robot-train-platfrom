import { Request, Response } from 'express';
import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;
const gen = (num: number) => {
  return new Array(num).fill(0);
};

const getNormalList = (req: any, res: any) => {
  let data: any = gen(12).map((item: any, index: number) => {
    return {
      title: '培训机器人' + index,
      process: 0.75,
      finished: index % 2 === 1,
    };
  });

  res.json({
    code: successCode,
    desc: '成功',
    data: {
      total: 24,
      list: data,
    },
  });
};

const getCourseInfo = (req: any, res: any) => {
  res.json({
    code: successCode,
    desc: '成功',
    data: {
      courseName: '新世纪-GPX-高智能方程式',
      customerInfo:
        '客户姓名: 张三，逾期2期，逾期金额200元，客户信息客户信息客户信息客户信息客户信息客户信息客户姓名：张三，逾期2期，逾期金额200元,客户信息客户信息客户信息客户信息客户信息客户信息客户信息客户信息客户信息',
      standardMsg:
        '您当前逾期2期，逾期金额2000元，为了不影响您在我行的信用，今天能还清么您当前逾期2期，逾期金额2000元，为了不影响您在我行的信用，今天能还清么您当前逾期2期，逾期金额2000元，为了不影响您在我行的信用，今天能还',
      keyPoint: '客户逾期信息、客户欠款信息、提醒还款、客户逾期信息、客户欠款信息、提醒还款',
      duration: 300,
      nodes: [
        {
          id: 'f496662d-ea19-4691-b9fe-3cf85e30a041',
          type: 'start',
          x: 460,
          y: 160,
          properties: {},
          text: { x: 460, y: 160, value: '开始' },
        },
        {
          id: 'bdbc7f12-1690-4bda-9256-5ade866ba4b8',
          type: 'student',
          x: 640,
          y: 320,
          properties: {},
          text: { x: 640, y: 320, value: '学员节点' },
        },
        {
          id: '9338b5a4-c676-491d-92c0-9361b4dc99c3',
          type: 'customer',
          x: 320,
          y: 500,
          properties: {},
          text: { x: 320, y: 500, value: '客服节点' },
        },
        {
          id: '2da32edd-175b-44b1-a132-a7b271507390',
          type: 'finish',
          x: 600,
          y: 660,
          properties: {},
          text: { x: 600, y: 660, value: '结束' },
        },
      ],
      edges: [
        {
          id: '3a0a2f39-c8aa-4d76-b016-7461df185b3c',
          type: 'line',
          sourceNodeId: 'f496662d-ea19-4691-b9fe-3cf85e30a041',
          targetNodeId: 'bdbc7f12-1690-4bda-9256-5ade866ba4b8',
          startPoint: { x: 510, y: 160 },
          endPoint: { x: 640, y: 283 },
          properties: {},
        },
        {
          id: 'e51b6d92-7817-41e5-9be8-597ec180cb04',
          type: 'line',
          sourceNodeId: 'bdbc7f12-1690-4bda-9256-5ade866ba4b8',
          targetNodeId: '9338b5a4-c676-491d-92c0-9361b4dc99c3',
          startPoint: { x: 640, y: 357 },
          endPoint: { x: 320, y: 463 },
          properties: {},
        },
        {
          id: '536ae6c4-183b-4d64-b8b1-2e44a56fa0c3',
          type: 'line',
          sourceNodeId: '9338b5a4-c676-491d-92c0-9361b4dc99c3',
          targetNodeId: '2da32edd-175b-44b1-a132-a7b271507390',
          startPoint: { x: 320, y: 537 },
          endPoint: { x: 600, y: 610 },
          properties: {},
        },
      ],
    },
  });
};

const getStepResult = (req: any, res: any) => {
  res.json({
    code: successCode,
    data: {
      score: 59,
      pointScoreList: [
        {
          deductModel: '话术部分得分',
          score: 30,
        },
        {
          deductModel: '情绪部分得分',
          score: 40,
        },
        {
          deductModel: '语句连贯部分得分',
          score: 20,
        },
        {
          deductModel: '扣分合计',
          score: 10,
        },
      ],
      pointsDeductionList: [
        {
          deductPoint: '话术缺少关键点',
          deductScore: -5,
        },
        {
          deductPoint: '超过8秒未回复客户',
          deductScore: -5,
        },
        {
          deductPoint: '话术错误',
          deductScore: -5,
        },
        {
          deductPoint: '话术缺少关键点2',
          deductScore: -5,
        },
        {
          deductPoint: '超过8秒未回复客户超过8秒未回复客户3超过8秒未回复客户3',
          deductScore: -5,
        },
        {
          deductPoint: '话术错误4',
          deductScore: -5,
        },
      ],
    },
  });
};

export default {
  // 获取课程信息
  [`GET ${baseUrl}/student/course/list`]: getNormalList,
  // 获取具体课程的信息、画布、客户信息
  [`GET ${baseUrl}/services/stu/course/courseNodeLineInfo`]: getCourseInfo,
  [`GET ${baseUrl}/services/stu/course/score`]: getStepResult,
};
