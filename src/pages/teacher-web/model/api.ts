import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取教师页课程分页列表 **/
export async function getCourseList(data?: Record<string, any>) {
  return request(`${baseUrl}/services/course/coursePage`, {
    method: 'POST',
    data,
  });
}

/** 获取教师页课程所有列表 **/
export async function getAllCourseList(data?: Record<string, any>) {
  return request(`${baseUrl}/services/course/courseList`, {
    method: 'POST',
    data,
  });
}

/** 教师页课程新增 **/
export async function _courseAdd(data?: Record<string, any>) {
  return request(`${baseUrl}/services/course/courseAdd`, {
    method: 'POST',
    data,
  });
}

/** 教师页课程复制 **/
export async function _courseCopy(data?: Record<string, any>) {
  return request(`${baseUrl}/services/course/courseCopy`, {
    method: 'POST',
    data,
  });
}

/** 教师页课程编辑 **/
export async function _courseEdit(data?: Record<string, any>) {
  return request(`${baseUrl}/services/course/courseEdit`, {
    method: 'POST',
    data,
  });
}

/** 教师页课程删除 **/
export async function _courseDelete(data?: Record<string, any>) {
  return request(`${baseUrl}/services/course/courseDelete`, {
    method: 'POST',
    data,
  });
}

/** 教师页课程发布 **/
export async function _coursePublish(data?: Record<string, any>) {
  return request(`${baseUrl}/services/course/coursePublish`, {
    method: 'POST',
    data,
  });
}

/** 教师页课程下线 **/
export async function _courseDown(data?: Record<string, any>) {
  return request(`${baseUrl}/services/course/courseDown`, {
    method: 'POST',
    data,
  });
}

//画布--------------------
export async function postDrawPanel_API(data?: { [key: string]: any }) {
  return request(`${baseUrl}/draw/save`, {
    method: 'POST',
    data,
  });
}

export async function getDrawPanel_API(data?: any) {
  return request(`${baseUrl}/draw/detail`, {
    method: 'GET',
    params: data,
  });
}

export async function addNode_API(data?: any) {
  return request(`${baseUrl}/draw/addNode`, {
    method: 'POST',
    params: data,
  });
}

export async function deleteNode_API(data?: any) {
  return request(`${baseUrl}/draw/deleteNode`, {
    method: 'POST',
    params: data,
  });
}
