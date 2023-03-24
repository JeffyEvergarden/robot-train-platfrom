import { useState } from 'react';
import {
  //---用户管理
  userPageApi,
  userListApi,
  groupListApi,
  userSynchApi,
  editApi,
  groupPageApi,
  addGroupApi,
  editGroupApi,
  deleteGroupApi,

  //----规则管理
  scoreSaveApi,
  gradeConfigApi,
} from './api';

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

  const groupPage = async (params?: any) => {
    setLoading(true);
    let res: any = await groupPageApi(params);
    setLoading(false);
    return res;
  };

  const addGroupRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await addGroupApi(params);
    setLoading(false);
    return res;
  };

  const editGroupRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await editGroupApi(params);
    setLoading(false);
    return res;
  };

  const deleteGroupRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await deleteGroupApi(params);
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
    groupPage,
    addGroupRequest,
    editGroupRequest,
    deleteGroupRequest,
  };
};

export const useRuleManageModel = () => {
  const [loading, setLoading] = useState<any>(false);

  const scoreSave = async (params?: any) => {
    setLoading(true);
    let res: any = await scoreSaveApi(params);
    setLoading(false);
    return res;
  };

  const gradeConfig = async (params?: any) => {
    setLoading(true);
    let res: any = await gradeConfigApi(params);
    setLoading(false);
    return res;
  };

  return {
    loading,
    setLoading,
    scoreSave,
    gradeConfig,
  };
};
