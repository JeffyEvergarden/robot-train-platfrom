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

const ruleConfig = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    resultDesc: '成功',
    data: {
      id: '1',
      speechSwitch: true,
      wordage: '1,5',
      toneSwitch: true,
      toneWords: '语气词1,语气词2,语气词3',
      repeatTime: 5,
      emotionnalSwitch: true,
      sensation: true,
    },
  });
};

const dialogConfig = (req: any, res: any) => {
  res.json({
    resultCode: successCode,
    resultDesc: '成功',
    data: {
      id: '1',
      similarNum: '80',
    },
  });
};

export default {
  [`POST ${baseUrl}/ai-teach/services/setting/gradeConfig`]: gradeConfig,
  [`POST ${baseUrl}/ai-teach/services/setting/gradeConfigSave`]: normalDeal,
  [`POST ${baseUrl}/ai-teach/services/setting/ruleConfig`]: ruleConfig,
  [`POST ${baseUrl}/ai-teach/services/setting/ruleConfigSave`]: normalDeal,
  [`POST ${baseUrl}/ai-teach/services/setting/dialogConfig`]: dialogConfig,
  [`POST ${baseUrl}/ai-teach/services/setting/dialogConfigSave`]: normalDeal,
};
