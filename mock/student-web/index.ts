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
      name: '新世纪福音战士',
      tips: '客户姓名: 张三，逾期2期，逾期金额200元，客户信息客户信息客户信息客户信息客户信息客户信息客户姓名：张三，逾期2期，逾期金额200元,客户信息客户信息客户信息客户信息客户信息客户信息客户信息客户信息客户信息',
      standardMsg:
        '您当前逾期2期，逾期金额2000元，为了不影响您在我行的信用，今天能还清么您当前逾期2期，逾期金额2000元，为了不影响您在我行的信用，今天能还清么您当前逾期2期，逾期金额2000元，为了不影响您在我行的信用，今天能还',
      keyPoint: '客户逾期信息、客户欠款信息、提醒还款、客户逾期信息、客户欠款信息、提醒还款',
      duration: 300,
      panel: {
        nodes: [
          {
            id: 'bd84a36e-6da2-4c18-8052-2f3a49b28fe5',
            type: 'course',
            x: 520,
            y: 100,
            properties: {},
            text: { x: 520, y: 100, value: '课程节点' },
          },
          {
            id: 'abbfb89c-7bb3-4174-9430-ecc467259dcb',
            type: 'task',
            x: 360,
            y: 240,
            properties: {},
            text: { x: 360, y: 240, value: '任务节点' },
          },
          {
            id: '7da1f738-cae1-4550-8bef-c669f068d8a9',
            type: 'task',
            x: 620,
            y: 240,
            properties: {},
            text: { x: 620, y: 240, value: '任务节点' },
          },
          {
            id: 'd1782302-fb90-415d-b080-a4f07d95cc1f',
            type: 'step',
            x: 360,
            y: 400,
            properties: {},
            text: { x: 360, y: 400, value: '步骤节点' },
          },
        ],
        edges: [
          {
            id: '29c5c2d6-b5c7-424b-967b-22289a5ff239',
            type: 'polyline',
            sourceNodeId: 'bd84a36e-6da2-4c18-8052-2f3a49b28fe5',
            targetNodeId: 'abbfb89c-7bb3-4174-9430-ecc467259dcb',
            startPoint: { x: 520, y: 137 },
            endPoint: { x: 360, y: 203 },
            properties: {},
            pointsList: [
              { x: 520, y: 137 },
              { x: 520, y: 173 },
              { x: 360, y: 173 },
              { x: 360, y: 203 },
            ],
          },
          {
            id: '300e1a19-587d-44a1-b2ed-3dad6a4690d4',
            type: 'polyline',
            sourceNodeId: 'bd84a36e-6da2-4c18-8052-2f3a49b28fe5',
            targetNodeId: '7da1f738-cae1-4550-8bef-c669f068d8a9',
            startPoint: { x: 520, y: 137 },
            endPoint: { x: 620, y: 203 },
            properties: {},
            pointsList: [
              { x: 520, y: 137 },
              { x: 520, y: 170 },
              { x: 620, y: 170 },
              { x: 620, y: 203 },
            ],
          },
          {
            id: '50eed6b3-81cb-42bd-833b-6342b828904d',
            type: 'polyline',
            sourceNodeId: 'abbfb89c-7bb3-4174-9430-ecc467259dcb',
            targetNodeId: 'd1782302-fb90-415d-b080-a4f07d95cc1f',
            startPoint: { x: 360, y: 277 },
            endPoint: { x: 360, y: 363 },
            properties: {},
            pointsList: [
              { x: 360, y: 277 },
              { x: 360, y: 363 },
            ],
          },
        ],
      },
    },
  });
};

const getStepResult = (req: any, res: any) => {
  res.json({
    code: successCode,
    data: {
      score: 59,
      scoreDetail: [
        {
          name: '话术部分得分',
          value: 30,
        },
        {
          name: '情绪部分得分',
          value: 40,
        },
        {
          name: '语句连贯部分得分',
          value: 20,
        },
        {
          name: '扣分合计',
          value: 10,
        },
      ],
      deductPoints: [
        {
          name: '话术缺少关键点',
          value: -5,
        },
        {
          name: '超过8秒未回复客户',
          value: -5,
        },
        {
          name: '话术错误',
          value: -5,
        },
        {
          name: '话术缺少关键点2',
          value: -5,
        },
        {
          name: '超过8秒未回复客户超过8秒未回复客户3超过8秒未回复客户3',
          value: -5,
        },
        {
          name: '话术错误4',
          value: -5,
        },
      ],
    },
  });
};

export default {
  // 获取课程信息
  [`GET ${baseUrl}/student/course/list`]: getNormalList,
  [`GET ${baseUrl}/student/course/info`]: getCourseInfo,
  [`GET ${baseUrl}/student/course/step/detail`]: getStepResult,
};
