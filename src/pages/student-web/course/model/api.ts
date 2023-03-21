import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

export async function getStudentCourse_API(data?: any) {
  return request(`${baseUrl}/student/course/list`, {
    method: 'GET',
    params: data,
  });
}

export async function getStudentCourseDetail_API(data?: any) {
  return request(`${baseUrl}/student/course/detail`, {
    method: 'GET',
    params: data,
  });
}
