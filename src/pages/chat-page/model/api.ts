import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

//按月列表
export async function GetCourseInfo_API(data?: { [key: string]: any }) {
  return request(`${baseUrl}/student/course/info`, {
    method: 'GET',
    params: data,
  });
}

export async function GetStepResult_API(data?: { [key: string]: any }) {
  return request(`${baseUrl}/student/course/step/detail`, {
    method: 'GET',
    params: data,
  });
}
