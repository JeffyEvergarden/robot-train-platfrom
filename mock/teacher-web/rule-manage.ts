import { Request, Response } from 'express';
import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const normalDeal = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    resultDesc: '成功',
  });
};

const gradeConfig = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    resultDesc: '成功',
    data: {
      id: '1',
      actionRate: '10',
      serviceRate: '12',
      serviceSingleRate: '13',
      dialogueRate: '14',
      dialogueSingleRate: '15',
    },
  });
};

export default {
  [`POST ${baseUrl}/ai-teach/services/setting/gradeConfig`]: gradeConfig,
  [`POST ${baseUrl}/ai-teach/services/setting/gradeConfigSave`]: normalDeal,
};
