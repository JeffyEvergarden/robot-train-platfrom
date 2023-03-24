import { request } from '@/services/request';
import config from '@/config/index';

const baseUrl: string = config.basePath;

/**----------------------用户管理--------------------------**/

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

/** 组别分页 **/
export async function groupPageApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/group/groupPage`, {
    method: 'POST',
    data: params,
  });
}

/** 新建组别 **/
export async function addGroupApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/group/groupAdd`, {
    method: 'POST',
    data: params,
  });
}

/** 编辑组别 **/
export async function editGroupApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/group/groupEdit`, {
    method: 'POST',
    data: params,
  });
}

/** 删除组别 **/
export async function deleteGroupApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/group/groupDelete`, {
    method: 'POST',
    data: params,
  });
}

/**----------------------规则管理--------------------------**/

/** 评分比例配置保存 **/
export async function scoreSaveApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/setting/gradeConfigSave`, {
    method: 'POST',
    data: params,
  });
}

/** 评分比例配置 **/
export async function gradeConfigApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/setting/gradeConfig`, {
    method: 'POST',
    data: params,
  });
}
