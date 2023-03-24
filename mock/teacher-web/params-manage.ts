import { Request, Response } from 'express';
import config from '../../src/config';

const successCode = config.successCode;

const baseUrl = config.basePath;

const gen = (num: number) => {
  return new Array(num).fill(0);
};

const userPage = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      id: index,
      account: '账号' + index,
      userName: '用户名称' + index,
      roleName: '角色名称' + index,
      phoneNumber: 17680765678,
      groupId: '组别' + index,
      groupName: '组别名称' + index,
      updateTime: '2023-12-12',
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

const userList = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      id: index,
      account: '账号' + index,
      userName: '用户名称' + index,
      phoneNumber: 17680765678,
      groupId: '组别' + index,
      groupName: '组别名称' + index,
      updateTime: '2023-12-12',
    };
  });

  res.json({
    resultCode: successCode,
    resultDesc: '成功',
    data: data,
  });
};

const groupList = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      id: index,
      groupName: '组别名称' + index,
      updateTime: '2023-12-12',
      creator: '创建人' + index,
      create_time: '2022-12-12',
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
    resultDesc: '是备案表改',
  });
};

const groupPage = (req: any, res: any) => {
  let data: any = gen(11).map((item: any, index: number) => {
    return {
      id: index,
      groupName: '组别名称' + index,
      updateTime: '2023-12-12',
      creator: '创建人' + index,
      create_time: '2022-12-12',
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
  [`POST ${baseUrl}/ai-teach/services/user/userPage`]: userPage,
  [`POST ${baseUrl}/ai-teach/services/user/userList`]: userList,
  [`POST ${baseUrl}/ai-teach/services/group/groupList`]: groupList,
  [`POST ${baseUrl}/ai-teach/services/user/userSynch`]: normalDeal,
  [`POST ${baseUrl}/ai-teach/services/user/userEdit`]: normalDeal,

  [`POST ${baseUrl}/ai-teach/services/group/groupPage`]: groupPage,
  [`POST ${baseUrl}/ai-teach/services/group/groupAdd`]: normalDeal,
  [`POST ${baseUrl}/ai-teach/services/group/groupEdit`]: normalDeal,
  [`POST ${baseUrl}/ai-teach/services/group/groupDelete`]: normalDeal,
};
