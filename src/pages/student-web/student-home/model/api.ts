import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function api_studentGroup(data?: any) {
  return request(`${baseUrl}/services/stu/index/studentGroup`, {
    method: 'post',
    data: data,
  });
}

export async function api_scoreSort(data?: any) {
  return request(`${baseUrl}/services/stu/index/scoreSort`, {
    method: 'post',
    data: data,
  });
}
