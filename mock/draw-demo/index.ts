import { Request, Response } from 'express';
import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const normalDeal = (req: any, res: any) => {
  res.json({
    code: successCode,
    desc: '成功',
  });
};

const getPanelDetail = (req: any, res: any) => {
  res.json({
    code: successCode,
    desc: '成功',
    data: {
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

export default {
  // 保存画布
  [`POST ${baseUrl}/draw/save`]: normalDeal,
  // 获取画布内容
  [`GET ${baseUrl}/draw/detail`]: getPanelDetail,
};
