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
      taskStatus: 0,
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
          id: '4899155c-3672-4ca0-bd55-c0745a721038',
          type: 'step',
          x: 360,
          y: 400,
          properties: {},
          text: { x: 360, y: 400, value: '步骤节点1' },
        },
        {
          id: '868ab5ad-4d04-4f36-bc4c-8dde1767d186',
          type: 'step',
          x: 360,
          y: 540,
          properties: {},
          text: { x: 360, y: 540, value: '步骤节点2' },
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
          id: '4e0867f9-1a12-4c46-a81d-f3b982066924',
          type: 'polyline',
          sourceNodeId: 'abbfb89c-7bb3-4174-9430-ecc467259dcb',
          targetNodeId: '4899155c-3672-4ca0-bd55-c0745a721038',
          startPoint: { x: 360, y: 269 },
          endPoint: { x: 360, y: 363 },
          properties: {},
        },
        {
          id: '255b80da-fb10-44db-a614-803b3d0ed314',
          type: 'polyline',
          sourceNodeId: '4899155c-3672-4ca0-bd55-c0745a721038',
          targetNodeId: '868ab5ad-4d04-4f36-bc4c-8dde1767d186',
          startPoint: { x: 360, y: 437 },
          endPoint: { x: 360, y: 503 },
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
