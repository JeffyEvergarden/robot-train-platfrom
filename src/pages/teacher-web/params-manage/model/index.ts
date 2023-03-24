import { useState } from 'react';
import { userPageApi, userListApi, groupListApi, userSynchApi, editApi } from './api';

//用户管理

export const useUserManageModel = () => {
  const [loading, setLoading] = useState<any>(false);
  const [userList, setUserList] = useState<any>([]);
  const [groupList, setGroupList] = useState<any>([]);

  const userPage = async (params?: any) => {
    setLoading(true);
    let res: any = await userPageApi(params);
    setLoading(false);

    return res;
  };

  const userListRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await userListApi(params);
    setLoading(false);
    setUserList(res?.data || []);
  };

  const groupListRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await groupListApi(params);
    setLoading(false);
    setGroupList(res?.data || []);
  };

  const sameStepRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await userSynchApi(params);
    setLoading(false);
    return res;
  };

  const editRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await editApi(params);
    setLoading(false);
    return res;
  };

  return {
    loading,
    setLoading,
    userPage,
    userListRequest,
    userList,
    groupListRequest,
    groupList,
    sameStepRequest,
    editRequest,
  };
};
