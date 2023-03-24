import config from '@/config';
import { message } from 'antd';
import { useState } from 'react';
import {
  addNode_API,
  deleteNode_API,
  getAllCourseList,
  getCourseList,
  getDrawPanel_API,
  postDrawPanel_API,
  _courseAdd,
  _courseDelete,
  _courseDown,
  _courseEdit,
  _coursePublish,
} from './api';

const { successCode } = config;

// 菜单管理的表格数据
export const useTableModel = () => {
  const [allTableList, setAllTableList] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  //课程分页
  const getTableList = async (params?: any) => {
    setTableLoading(true);
    let res: any = await getCourseList(params);
    setTableLoading(false);
    if (res?.resultCode == successCode) {
      return { data: res?.data?.list, total: res?.data?.totalPage };
    } else {
      message.error(res?.resultDesc);
      return { data: [], total: 0 };
    }
  };
  //课程所有
  const getAllTablelist = async (params?: any) => {
    let res: any = await getAllCourseList(params);
    if (res?.resultCode == successCode) {
      setAllTableList(res?.data);
    } else {
      setAllTableList([]);
    }
  };
  //新增
  const courseAdd = async (params?: any) => {
    let res: any = await _courseAdd(params);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //编辑
  const courseEdit = async (params?: any) => {
    let res: any = await _courseEdit(params);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //删除
  const courseDelete = async (params?: any) => {
    let res: any = await _courseDelete(params);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //发布
  const coursePublish = async (params?: any) => {
    let res: any = await _coursePublish(params);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc);
      return res;
    } else {
      message.error(res?.resultDesc);
      return false;
    }
  };
  //下线
  const courseDown = async (params?: any) => {
    let res: any = await _courseDown(params);
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
    getAllTablelist,
    getTableList, // 获取表格数据
    courseAdd,
    courseEdit,
    courseDelete,
    coursePublish,
    courseDown,
  };
};

export const useDrawModel = () => {
  // 保存画布接口
  const saveDrawPanel = async (data: any) => {
    let res: any = await postDrawPanel_API(data);
    // 画布
    if (res.code === successCode) {
      message.success('保存成功');
    } else {
      message.warning('保存失败');
    }
  };

  const getDrawPanel = async (data: any) => {
    let res: any = await getDrawPanel_API(data);
    // 画布
    if (res.code === successCode) {
      return res.data;
    } else {
      message.warning('获取画布失败');
      return false;
    }
  };

  const addNode = async (data: any) => {
    let res: any = await addNode_API(data);
    if (res.code === successCode) {
      return true;
    } else {
      message.warning('节点添加失败');
      return false;
    }
  };

  const deleteNode = async (data: any) => {
    let res: any = await deleteNode_API(data);
    if (res.code === successCode) {
      return true;
    } else {
      message.warning('节点添加失败');
      return false;
    }
  };

  return {
    saveDrawPanel, // 保存画布
    getDrawPanel, // 获取画布
    addNode,
    deleteNode,
  };
};
