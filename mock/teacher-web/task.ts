import { Request, Response } from 'express';
import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;
const gen = (num: number) => {
  return new Array(num).fill(0);
};

const defaultResault = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    resultDesc: '成功',
  });
};

const getTaskList = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      taskName: '任务' + index,
      taskModel: Math.ceil(Math.random() * 2),
      taskType: Math.ceil(Math.random() * 2),
      passScore: Math.ceil(Math.random() * 40 + 60),
      progress: Math.floor(Math.random() * 3),
      taskStatus: Math.floor(Math.random() * 2),
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

const getTaskList2 = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      taskName: '任务' + index,
      taskModel: Math.ceil(Math.random() * 2),
      taskType: Math.ceil(Math.random() * 2),
      passScore: Math.ceil(Math.random() * 40 + 60),
      progress: Math.floor(Math.random() * 3),
      taskStatus: Math.floor(Math.random() * 2),
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

const taskDetail = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    resultDesc: '成功',
    data: {
      taskName: '任务',
      taskModel: Math.ceil(Math.random() * 2),
      taskType: Math.ceil(Math.random() * 2),
      passScore: Math.ceil(Math.random() * 40 + 60),
      progress: Math.floor(Math.random() * 3),
      taskStatus: Math.floor(Math.random() * 2),
      creator: 'root',
      id: 1,
    },
  });
};

const getDraw = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    resultDesc: '成功',
    data: {
      id: '100', //课程id
      nodes: [
        {
          id: 'f496662d-ea19-4691-b9fe-3cf85e30a041',
          type: 'course',
          name: 'xxx',
          x: 460,
          y: 160,
          properties: {},
          text: { x: 460, y: 160, value: '开始' },
        },
        {
          id: 'bdbc7f12-1690-4bda-9256-5ade866ba4b8',
          type: 'task',
          name: 'xxx',
          x: 640,
          y: 320,
          properties: {},
          text: { x: 640, y: 320, value: '学员节点' },
        },
        {
          id: '9338b5a4-c676-491d-92c0-9361b4dc99c3',
          type: 'step',
          name: 'xxx',
          x: 320,
          y: 500,
          properties: {},
          text: { x: 320, y: 500, value: '客服节点' },
        },
        {
          id: '2da32edd-175b-44b1-a132-a7b271507390',
          type: 'step-html',
          name: 'xxx',
          x: 600,
          y: 660,
          properties: { status: 'wait' },
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
          endPoint: { x: 600, y: 623 },
          properties: {},
        },
      ],
    },
  });
};

export default {
  //任务
  [`POST ${baseUrl}/services/task/taskPage`]: getTaskList,
  [`POST ${baseUrl}/services/task/taskList`]: getTaskList2,
  [`POST ${baseUrl}/services/task/taskAdd`]: defaultResault,
  [`POST ${baseUrl}/services/task/taskDetail`]: taskDetail,
  [`POST ${baseUrl}/services/task/taskEdit`]: defaultResault,
  [`POST ${baseUrl}/services/task/taskDelete`]: defaultResault,
  [`POST ${baseUrl}/services/task/taskOpen`]: defaultResault,
  [`POST ${baseUrl}/services/task/taskClose`]: defaultResault,

  [`POST ${baseUrl}/services/task/taskNodeLineInfo`]: getDraw,
  [`POST ${baseUrl}/services/task/taskLineInfoSave`]: defaultResault,
};
