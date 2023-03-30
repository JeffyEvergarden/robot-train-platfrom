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

/** 服务规则配置 **/
export async function ruleConfigApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/setting/ruleConfig`, {
    method: 'POST',
    data: params,
  });
}

/** 服务规则保存 **/
export async function ruleSaveApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/setting/ruleConfigSave`, {
    method: 'POST',
    data: params,
  });
}

/** 话术标准配置 **/
export async function dialogConfigApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/setting/dialogConfig`, {
    method: 'POST',
    data: params,
  });
}

/** 话术标准保存 **/
export async function dialogSaveApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/setting/dialogConfigSave`, {
    method: 'POST',
    data: params,
  });
}

/** 课程模型列表 **/
export async function courceListApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/model/modelPage`, {
    method: 'POST',
    data: params,
  });
}

/** 课程模型列表--不分页 **/
export async function courceDataApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/model/modelList`, {
    method: 'POST',
    data: params,
  });
}

/** 课程模型列表--删除 **/
export async function deleteCourceApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/model/modelDelete`, {
    method: 'POST',
    data: params,
  });
}

/** 课程模型列表--新增 **/
export async function modelAddApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/model/modelAdd`, {
    method: 'POST',
    data: params,
  });
}

/** 课程模型列表--编辑 **/
export async function modelEditApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/model/modelEdit`, {
    method: 'POST',
    data: params,
  });
}

/** 课程模型列表--客户意图列表 **/
export async function customerIntentionListApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/intent/intentPage`, {
    method: 'POST',
    data: params,
  });
}

/** 课程模型列表--客户意图列表--不分页 **/
export async function intentListApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/intent/intentList`, {
    method: 'POST',
    data: params,
  });
}

/** 课程模型列表--客户意图--删除**/
export async function delIntentApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/intent/intentDelete`, {
    method: 'POST',
    data: params,
  });
}

/** 课程模型列表--客户意图列表--新建 **/
export async function intentAddApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/intent/intentAdd`, {
    method: 'POST',
    data: params,
  });
}

/** 课程模型列表--客户意图列表--编辑 **/
export async function intentEditApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/intent/intentEdit`, {
    method: 'POST',
    data: params,
  });
}

/** 课程模型列表--客户意图列表--详情 **/
export async function intentDetailApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/intent/intentDetail`, {
    method: 'POST',
    data: params,
  });
}

/** 课程模型列表--客户意图列表--详情 **/
export async function intentSyncApi(params?: Record<string, any>) {
  return request(`${baseUrl}/ai-teach/services/intent/intentSync`, {
    method: 'POST',
    data: params,
  });
}
