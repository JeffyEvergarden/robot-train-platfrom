import React, { Fragment, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Tabs, Select, Button, message, Spin } from 'antd';
import styles from './../index.less';
import { useUserManageModel } from './../model';
import EditUserModal from '../components/editUserModal';

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
  } = useUserManageModel();

  const editUserRef = useRef<any>();
  const userActionRef = useRef<any>();

  useEffect(() => {
    userListRequest();
    groupListRequest();
  }, []);

  const getUserList = async (payload: any) => {
    let params = {
      ...payload,
    };
    params.updateTime = payload?.updateTime?.formate('YYYY-MM-DD');
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
    editUserRef?.current?.open(record);
  };

  const editComfirm = async (formVal: any, rowData: any) => {
    let params = {
      id: rowData?.id,
      groupId: formVal?.groupId,
    };
    let res = await editRequest(params);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc || '成功');
      editUserRef?.current?.close();
      userActionRef?.current?.reloadAndRest();
    } else {
      message.error(res?.resultDesc || '失败');
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
              <Select.Option key={item?.id} value={item?.account}>
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
        <Select optionFilterProp="children" showSearch allowClear placeholder="请选择部门组别">
          {groupList?.map((item: any) => {
            return (
              <Select.Option key={item?.id} value={item?.id}>
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
      search: true,
      valueType: 'date',
      fieldProps: {
        placeholder: '请选择同步时间',
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
                bordered
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
            组别管理
          </Tabs.TabPane>
        </Tabs>
        <EditUserModal
          cref={editUserRef}
          loading={loading}
          groupList={groupList}
          editComfirm={editComfirm}
        />
      </PageContainer>
    </div>
  );
};

export default UserManage;
