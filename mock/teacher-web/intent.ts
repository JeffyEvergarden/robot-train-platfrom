import { Request, Response } from 'express';
import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const gen = (num: number) => {
  return new Array(num).fill(0);
};

const intentPage = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      id: index,
      intentName: '意图名称' + index,
      intentText: '话术' + index,
      updateTime: '2023-12-12',
      creator: '创建人' + index,
      createTime: '2023-12-12',
      modifiedBy: '更新人',
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

const intentList = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      id: index,
      intentName: '意图名称' + index,
      updateTime: '2023-12-12',
      creator: '创建人' + index,
      createTime: '2023-12-12',
      modifiedBy: '更新人',
    };
  });

  res.json({
    resultCode: successCode,
    resultDesc: '成功',
    data: data,
  });
};

const normalDeal = (req: any, res: any) => {
  res.json({
    resultCode: 12,
    resultDesc: '请吃饭个返回讲那个',
  });
};

const intentDetail = (req: any, res: any) => {
  res.json({
    resultCode: 12,
    resultDesc: '请吃饭个返回讲那个',
    data: {
      intentName: '意图名称',
      intentTextList: [
        { intentText: '话术1' },
        { intentText: '话术2' },
        { intentText: '话术3' },
        { intentText: '话术4' },
      ],
    },
  });
};

export default {
  [`POST ${baseUrl}/ai-teach/services/intent/intentPage`]: intentPage,
  [`POST ${baseUrl}/ai-teach/services/intent/intentList`]: intentList,
  [`POST ${baseUrl}/ai-teach/services/intent/intentDelete`]: normalDeal,
  [`POST ${baseUrl}/ai-teach/services/intent/intentAdd`]: normalDeal,
  [`POST ${baseUrl}/ai-teach/services/intent/intentEdit`]: normalDeal,
  [`POST ${baseUrl}/ai-teach/services/intent/intentDetail`]: intentDetail,
};
