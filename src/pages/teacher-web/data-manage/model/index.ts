import config from '@/config';
import { message } from 'antd';
import { useState } from 'react';
import { taskReportApi, studentReportApi } from './api';
const { successCode } = config;

export const useDataManageModel = () => {
  const [loading, setLoading] = useState<any>(false);
  // 分页-任务数据列表
  const getTaskReport = async (payload: any) => {
    setLoading(true);
    let params = {
      ...payload,
      taskId: payload?.taskName?.join(','),
      page: payload?.current,
    };
    delete params?.current;
    delete params?.taskName;
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
      taskId: payload?.taskName?.join(','),
      page: payload?.current,
    };
    delete params?.current;
    delete params?.taskName;
    let res = await studentReportApi(params);
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
  };
};
