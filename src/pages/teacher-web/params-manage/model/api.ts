import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/** 获取用户管理列表 **/
export async function userPageApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/user/userPage`, {
    method: 'POST',
    data: params,
  });
}

/** 获取用户列表 **/
export async function userListApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/user/userList`, {
    method: 'POST',
    data: params,
  });
}

/** 组别列表 **/
export async function groupListApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/group/groupList`, {
    method: 'POST',
    data: params,
  });
}

/** 同步 **/
export async function userSynchApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/user/userSynch`, {
    method: 'POST',
    data: params,
  });
}

/** 编辑用户 **/
export async function editApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/user/userEdit`, {
    method: 'POST',
    data: params,
  });
}
