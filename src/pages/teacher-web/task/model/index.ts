import config from '@/config';
import { message } from 'antd';
import { useState } from 'react';
import {
  _taskAdd,
  _taskClose,
  _taskDelete,
  _taskDetail,
  _taskEdit,
  _taskList,
  _taskOpen,
  _taskPage,
} from './api';
const { successCode } = config;
// 任务管理
export const useTaskModel = () => {
  const [allTableList, setAllTableList] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  //分页
  const getTaskPage = async (params?: any) => {
    setTableLoading(true);
    let res: any = await _taskPage(params);
    setTableLoading(false);
    if (res?.resultCode == successCode) {
      return { data: res?.data?.list, total: res?.data?.totalPage };
    } else {
      message.error(res?.resultDesc);
      return { data: [], total: 0 };
    }
  };
  //所有
  const getAllTaskList = async (params?: any) => {
    setTableLoading(true);
    let res: any = await _taskList(params);
    setTableLoading(false);
    if (res?.resultCode == successCode) {
      setAllTableList(res?.data);
    } else {
      setAllTableList([]);
    }
  };
  //新增
  const taskAdd = async (params?: any) => {
    setFormLoading(true);
    let res: any = await _taskAdd(params);
    setFormLoading(false);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //详情
  const taskDetail = async (params?: any) => {
    setFormLoading(true);
    let res: any = await _taskDetail(params);
    setFormLoading(false);
    if (res?.resultCode == successCode) {
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //编辑
  const taskEdit = async (params?: any) => {
    setFormLoading(true);
    let res: any = await _taskEdit(params);
    setFormLoading(false);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //删除
  const taskDelete = async (params?: any) => {
    setTableLoading(true);
    let res: any = await _taskDelete(params);
    setTableLoading(false);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //发布
  const taskOpen = async (params?: any) => {
    setTableLoading(true);
    let res: any = await _taskOpen(params);
    setTableLoading(false);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //下线
  const taskClose = async (params?: any) => {
    setTableLoading(true);
    let res: any = await _taskClose(params);
    setTableLoading(false);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };

  return {
    allTableList,
    tableLoading,
    formLoading,
    getAllTaskList,
    getTaskPage, // 获取表格数据
    taskAdd,
    taskDetail,
    taskEdit,
    taskDelete,
    taskOpen,
    taskClose,
  };
};

// 任务画布
export const useTaskDrawModel = () => {
  const [allTableList, setAllTableList] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  //分页
  const getTaskPage = async (params?: any) => {
    setTableLoading(true);
    let res: any = await _taskPage(params);
    setTableLoading(false);
    if (res?.resultCode == successCode) {
      return { data: res?.data?.list, total: res?.data?.totalPage };
    } else {
      message.error(res?.resultDesc);
      return { data: [], total: 0 };
    }
  };
  //所有
  const getAllTaskList = async (params?: any) => {
    setTableLoading(true);
    let res: any = await _taskList(params);
    setTableLoading(false);
    if (res?.resultCode == successCode) {
      setAllTableList(res?.data);
    } else {
      setAllTableList([]);
    }
  };
  //新增
  const taskAdd = async (params?: any) => {
    setFormLoading(true);
    let res: any = await _taskAdd(params);
    setFormLoading(false);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //详情
  const taskDetail = async (params?: any) => {
    setFormLoading(true);
    let res: any = await _taskDetail(params);
    setFormLoading(false);
    if (res?.resultCode == successCode) {
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //编辑
  const taskEdit = async (params?: any) => {
    setFormLoading(true);
    let res: any = await _taskEdit(params);
    setFormLoading(false);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //删除
  const taskDelete = async (params?: any) => {
    setTableLoading(true);
    let res: any = await _taskDelete(params);
    setTableLoading(false);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //发布
  const taskOpen = async (params?: any) => {
    setTableLoading(true);
    let res: any = await _taskOpen(params);
    setTableLoading(false);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //下线
  const taskClose = async (params?: any) => {
    setTableLoading(true);
    let res: any = await _taskClose(params);
    setTableLoading(false);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };

  return {
    allTableList,
    tableLoading,
    formLoading,
    getAllTaskList,
    getTaskPage, // 获取表格数据
    taskAdd,
    taskDetail,
    taskEdit,
    taskDelete,
    taskOpen,
    taskClose,
  };
};
