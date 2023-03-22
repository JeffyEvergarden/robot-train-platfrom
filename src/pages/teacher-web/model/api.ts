import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取教师列表 **/
export async function getCourseList(params?: Record<string, any>) {
  return request(`${baseUrl}/teacher/course/list`, {
    method: 'GET',
    params,
  });
}
