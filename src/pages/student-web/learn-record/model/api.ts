import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取课程练习记录-列表 **/
export async function learnRecordApi(params?: Record<string, any>) {
  return request(`${baseUrl}/services/stu/hitory/learn`, {
    method: 'POST',
    data: params,
  });
}

/** 获取课程列表 **/
export async function courseListApi(params?: Record<string, any>) {
  return request(`${baseUrl}/services/stu/hitory/courseList`, {
    method: 'POST',
    data: params,
  });
}

/** 获取课程列表 **/
export async function scoreApi(params?: Record<string, any>) {
  return request(`${baseUrl}/services/stu/course/score`, {
    method: 'POST',
    data: params,
  });
}
