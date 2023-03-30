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
  ruleConfigApi,
  ruleSaveApi,
  dialogConfigApi,
  dialogSaveApi,

  //-----系统管理
  courceListApi,
  courceDataApi,
  deleteCourceApi,
  modelAddApi,
  modelEditApi,

  //------意图
  customerIntentionListApi,
  intentListApi,
  delIntentApi,
  intentAddApi,
  intentEditApi,
  intentDetailApi,
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

  const ruleConfig = async (params?: any) => {
    setLoading(true);
    let res: any = await ruleConfigApi(params);
    setLoading(false);
    return res;
  };

  const ruleSave = async (params?: any) => {
    setLoading(true);
    let res: any = await ruleSaveApi(params);
    setLoading(false);
    return res;
  };

  const dialogConfig = async (params?: any) => {
    setLoading(true);
    let res: any = await dialogConfigApi(params);
    setLoading(false);
    return res;
  };

  const dialogSave = async (params?: any) => {
    setLoading(true);
    let res: any = await dialogSaveApi(params);
    setLoading(false);
    return res;
  };

  return {
    loading,
    setLoading,
    scoreSave,
    gradeConfig,
    ruleConfig,
    ruleSave,
    dialogConfig,
    dialogSave,
  };
};

export const useCourceModel = () => {
  const [loading, setLoading] = useState<any>(false);

  const courceList = async (params?: any) => {
    setLoading(true);
    let res: any = await courceListApi(params);
    setLoading(false);
    return res;
  };

  const courceData = async (params?: any) => {
    setLoading(true);
    let res: any = await courceDataApi(params);
    setLoading(false);
    return res;
  };

  const deleteCource = async (params?: any) => {
    setLoading(true);
    let res: any = await deleteCourceApi(params);
    setLoading(false);
    return res;
  };

  const modelAdd = async (params?: any) => {
    setLoading(true);
    let res: any = await modelAddApi(params);
    setLoading(false);
    return res;
  };

  const modelEdit = async (params?: any) => {
    setLoading(true);
    let res: any = await modelEditApi(params);
    setLoading(false);
    return res;
  };

  return {
    loading,
    courceList,
    courceData,
    deleteCource,
    modelAdd,
    modelEdit,
  };
};

export const useIntentionModel = () => {
  const [loading, setLoading] = useState<any>(false);

  const customerIntentionList = async (params?: any) => {
    setLoading(true);
    let res: any = await customerIntentionListApi(params);
    setLoading(false);
    return res;
  };

  const intentListRequest = async (params?: any) => {
    setLoading(true);
    let res: any = await intentListApi(params);
    setLoading(false);
    return res;
  };

  const delIntent = async (params?: any) => {
    setLoading(true);
    let res: any = await delIntentApi(params);
    setLoading(false);
    return res;
  };

  const intentAdd = async (params?: any) => {
    setLoading(true);
    let res: any = await intentAddApi(params);
    setLoading(false);
    return res;
  };

  const intentEdit = async (params?: any) => {
    setLoading(true);
    let res: any = await intentEditApi(params);
    setLoading(false);
    return res;
  };

  const intentDetail = async (params?: any) => {
    setLoading(true);
    let res: any = await intentDetailApi(params);
    setLoading(false);
    return res;
  };

  return {
    customerIntentionList,
    intentListRequest,
    delIntent,
    intentAdd,
    intentEdit,
    intentDetail,
  };
};
