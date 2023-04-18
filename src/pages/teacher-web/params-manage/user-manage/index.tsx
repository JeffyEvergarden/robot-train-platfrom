import React, { Fragment, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Tabs, Select, Button, message, Spin, Space, notification } from 'antd';
import styles from './../index.less';
import { useUserManageModel } from './../model';
import EditUserModal from '../components/editUserModal';
import { CloseCircleOutlined } from '@ant-design/icons';

import config from '@/config';
const successCode = config.successCode;

const UserManage: React.FC = (props: any) => {
  const {
    loading,
    setLoading,
    userPage,
    userListRequest,
    userList,
    groupListRequest,
    groupList,
    sameStepRequest,
    editRequest,
    groupPage,
    addGroupRequest,
    editGroupRequest,
    deleteGroupRequest,
  } = useUserManageModel();

  const editUserRef = useRef<any>();
  const userActionRef = useRef<any>();
  const groupActionRef = useRef<any>();

  useEffect(() => {
    userListRequest({});
    groupListRequest({});
  }, []);

  const getUserList = async (payload: any) => {
    let params = {
      ...payload,
      page: payload?.current,
    };
    delete params?.current;
    params.startTime = payload?.updateTime?.[0];
    params.endTime = payload?.updateTime?.[1];
    params.groupName = params?.groupName?.join(',');
    delete params?.updateTime;
    let res = await userPage(params);
    return {
      data: res?.data?.list,
      total: res?.data?.totalPage,
      current: payload?.current || 1,
      pageSize: payload?.pageSize || 10,
    };
  };

  const sameStep = async () => {
    let res = await sameStepRequest();
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc || '同步成功');
    } else {
      message.error(res?.resultDesc || '同步失败');
    }
  };

  const editUser = (record: any) => {
    editUserRef?.current?.open(record, 'editUser');
  };

  const comfirmSubmit = async (formVal: any, rowData: any, pageType: any) => {
    let params = {
      id: rowData?.id,
      ...formVal,
    };
    let res;
    if (pageType == 'editUser') {
      res = await editRequest(params);
    } else if (pageType == 'addGroup') {
      res = await addGroupRequest(params);
    } else if (pageType == 'editGroup') {
      res = await editGroupRequest(params);
    }
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc || '成功');
      editUserRef?.current?.close();
      if (pageType == 'editUser') {
        userActionRef?.current?.reloadAndRest();
        userListRequest({});
      } else {
        groupActionRef?.current?.reloadAndRest();
        groupListRequest({});
      }
    } else {
      message.error(res?.resultDesc || '失败');
    }
  };

  const getGroupList = async (payload: any) => {
    let params = {
      ...payload,
      groupName: payload?.groupName?.join(','),
      page: payload?.current,
    };
    delete params?.current;
    params.startTime = payload?.createTime?.[0];
    params.endTime = payload?.createTime?.[1];
    delete params?.createTime;
    let res = await groupPage(params);
    return {
      data: res?.data?.list,
      total: res?.data?.totalPage,
      current: payload?.current || 1,
      pageSize: payload?.pageSize || 10,
    };
  };

  const addGroup = () => {
    editUserRef?.current?.open({}, 'addGroup');
  };
  const editGroup = (record: any) => {
    editUserRef?.current?.open(record, 'editGroup');
  };
  const deleteGroup = async (record: any) => {
    let params = {
      id: record?.id,
    };
    let res = await deleteGroupRequest(params);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc || '成功');
      groupActionRef?.current?.reloadAndRest();
      userListRequest({});
    } else {
      const key = `open${Date.now()}`;
      notification.open({
        message: '',
        icon: <CloseCircleOutlined style={{ color: 'red' }} />,
        description: (
          <Fragment>
            <div>删除失败</div>
            <div>{res?.resultDesc || '该组别存在学员，请先修改学员组别'}</div>
          </Fragment>
        ),
        duration: null,
        key,
        btn: (
          <Button type="primary" size="small" onClick={() => notification.close(key)}>
            知道了
          </Button>
        ),
      });
    }
  };

  const userColumns: any[] = [
    {
      title: '用户账号',
      dataIndex: 'account',
      key: 'account',
      ellipsis: true,
      search: false,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
      search: true,
      renderFormItem: () => (
        <Select optionFilterProp="children" showSearch allowClear placeholder="请选择姓名">
          {userList?.map((item: any) => {
            return (
              <Select.Option key={item?.id} value={item?.userName}>
                {item?.userName}
              </Select.Option>
            );
          })}
        </Select>
      ),
    },
    {
      title: '手机号码',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      ellipsis: true,
      search: false,
    },
    {
      title: '部门组别',
      dataIndex: 'groupName',
      key: 'groupName',
      ellipsis: true,
      search: true,
      fieldProps: {
        placeholder: '请选择部门组别',
      },
      renderFormItem: () => (
        <Select
          optionFilterProp="children"
          showSearch
          allowClear
          placeholder="请选择部门组别"
          mode="multiple"
        >
          {groupList?.map((item: any) => {
            return (
              <Select.Option key={item?.id} value={item?.groupName}>
                {item?.groupName}
              </Select.Option>
            );
          })}
        </Select>
      ),
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
      ellipsis: true,
      search: false,
    },
    {
      title: '同步时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      ellipsis: true,
      search: false,
    },
    {
      title: '同步时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      ellipsis: true,
      search: true,
      valueType: 'dateRange',
      hideInTable: true,
      fieldProps: {
        placeholder: ['开始时间', '结束时间'],
      },
    },
    {
      title: '操作',
      key: 'option',
      fixed: 'right',
      valueType: 'option',
      render: (t: any, r: any, i: any) => {
        return <a onClick={() => editUser(r)}>编辑</a>;
      },
    },
  ];

  const groupColumns: any[] = [
    {
      title: '部门组别',
      dataIndex: 'groupName',
      key: 'groupName',
      ellipsis: true,
      search: true,
      fieldProps: {
        placeholder: '请选择部门组别',
      },
      renderFormItem: () => (
        <Select
          optionFilterProp="children"
          showSearch
          allowClear
          mode="multiple"
          placeholder="请选择部门组别"
        >
          {groupList?.map((item: any) => {
            return (
              <Select.Option key={item?.id} value={item?.groupName}>
                {item?.groupName}
              </Select.Option>
            );
          })}
        </Select>
      ),
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      ellipsis: true,
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
      search: true,
      hideInTable: true,
      valueType: 'dateRange',
    },
    {
      title: '操作',
      key: 'option',
      fixed: 'right',
      valueType: 'option',
      render: (t: any, r: any, i: any) => {
        return (
          <Space>
            <a onClick={() => editGroup(r)}>编辑</a>
            <a style={{ color: 'red' }} onClick={() => deleteGroup(r)}>
              删除
            </a>
          </Space>
        );
      },
    },
  ];
  return (
    <div className={styles.commonTabsSty}>
      <PageContainer
        header={{
          title: '用户管理',
          breadcrumb: {},
        }}
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="用户管理" key="1">
            <Spin spinning={loading}>
              <ProTable
                rowKey={(record: any) => record?.id}
                actionRef={userActionRef}
                headerTitle="用户列表"
                toolBarRender={() => [
                  <Button type="primary" key="sameStep" onClick={sameStep}>
                    同步
                  </Button>,
                ]}
                options={false}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                }}
                search={{
                  labelWidth: 'auto',
                }}
                columns={userColumns}
                scroll={{ x: userColumns?.length * 150 }}
                request={async (params = {}, sort, filter) => {
                  return getUserList({ ...params });
                }}
              />
            </Spin>
          </Tabs.TabPane>
          <Tabs.TabPane tab="组别管理" key="2">
            <Spin spinning={loading}>
              <ProTable
                rowKey={(record: any) => record?.id}
                actionRef={groupActionRef}
                headerTitle="组别列表"
                toolBarRender={() => [
                  <Button type="primary" key="sameStep" onClick={() => addGroup()}>
                    新建
                  </Button>,
                ]}
                options={false}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                }}
                search={{
                  labelWidth: 'auto',
                }}
                columns={groupColumns}
                scroll={{ x: groupColumns?.length * 150 }}
                request={async (params = {}, sort, filter) => {
                  return getGroupList({ ...params });
                }}
              />
            </Spin>
          </Tabs.TabPane>
        </Tabs>
        <EditUserModal
          cref={editUserRef}
          loading={loading}
          groupList={groupList}
          comfirmSubmit={comfirmSubmit}
        />
      </PageContainer>
    </div>
  );
};

export default UserManage;
