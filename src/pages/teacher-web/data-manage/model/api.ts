import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取数据管理任务数据-列表 **/
export async function taskReportApi(params?: Record<string, any>) {
  return request(`${baseUrl}/services/report/taskReport`, {
    method: 'POST',
    data: params,
  });
}

/** 获取数据管理任务数据-列表 **/
export async function studentReportApi(params?: Record<string, any>) {
  return request(`${baseUrl}/services/report/studentReport`, {
    method: 'POST',
    data: params,
  });
}
