import config from '@/config';
import { message } from 'antd';
import { useState } from 'react';
import {
  taskReportApi,
  studentReportApi,
  taskReportDetailApi,
  studentReportDetailApi,
} from './api';
const { successCode } = config;

export const useDataManageModel = () => {
  const [loading, setLoading] = useState<any>(false);
  // 分页-任务数据列表
  const getTaskReport = async (payload: any) => {
    setLoading(true);
    let params = {
      ...payload,
      taskIdList: payload?.taskName?.length > 0 ? payload.taskName : undefined,
      accountList: payload?.creator?.length > 0 ? payload.creator : undefined,
      page: payload?.current,
    };
    delete params?.current;
    delete params?.taskName;
    delete params?.creator;
    let res = await taskReportApi(params);
    setLoading(false);
    if (res?.resultCode == successCode) {
      return { data: res?.data?.list, total: res?.data?.totalPage };
    } else {
      message.error(res?.resultDesc);
      return { data: [], total: 0 };
    }
  };

  // 分页-学员数据列表
  const getStudentReport = async (payload: any) => {
    setLoading(true);
    let params = {
      ...payload,
      accountList: payload?.userName?.length > 0 ? payload.userName : undefined,
      page: payload?.current,
    };
    delete params?.current;
    delete params?.userName;
    let res = await studentReportApi(params);
    setLoading(false);
    if (res?.resultCode == successCode) {
      return { data: res?.data?.list, total: res?.data?.totalPage };
    } else {
      message.error(res?.resultDesc);
      return { data: [], total: 0 };
    }
  };

  // 分页-任务详细数据列表
  const getTaskReportDetail = async (payload: any) => {
    setLoading(true);
    let params = {
      ...payload,
      courseIdList: payload?.taskNodeName?.length > 0 ? payload.taskNodeName : undefined,
      page: payload?.current,
    };
    delete params?.current;
    delete params?.taskNodeName;
    let res = await taskReportDetailApi(params);
    setLoading(false);
    if (res?.resultCode == successCode) {
      return { data: res?.data?.list, total: res?.data?.totalPage };
    } else {
      message.error(res?.resultDesc);
      return { data: [], total: 0 };
    }
  };

  // 分页-学员详细数据列表
  const getStudentReportDetail = async (payload: any) => {
    setLoading(true);
    let params = {
      ...payload,
      taskIdList: payload?.taskName?.length > 0 ? payload.taskName : undefined,
      courseIdList: payload?.taskNodeName?.length > 0 ? payload.taskNodeName : undefined,
      page: payload?.current,
    };
    delete params?.current;
    delete params?.taskName;
    delete params?.taskNodeName;
    let res = await studentReportDetailApi(params);
    setLoading(false);
    if (res?.resultCode == successCode) {
      return { data: res?.data?.list, total: res?.data?.totalPage };
    } else {
      message.error(res?.resultDesc);
      return { data: [], total: 0 };
    }
  };

  return {
    getTaskReport,
    getStudentReport,
    getTaskReportDetail,
    getStudentReportDetail,
  };
};
