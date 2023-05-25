import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { useModel, history } from 'umi';
import ProTable from '@ant-design/pro-table';
import { Fragment, useRef, useState, useEffect } from 'react';
import { Button, Select, Tabs, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useDataManageModel } from './model';
import { useUserManageModel } from '../params-manage/model';
import { useTaskModel } from '../task/model';

import { formatePercent } from '@/utils';

export default () => {
  const state: any = history.location.state || {};
  const tab: any = state.tab || 'task';

  const taskFormRef = useRef<FormInstance>();
  const studentFormRef = useRef<FormInstance>();
  const studentActionRef = useRef<ActionType>();
  const { getTaskReport, getStudentReport } = useDataManageModel();
  const { userList, groupList, userListRequest, groupListRequest } = useUserManageModel();
  const { allTableList, getAllTaskList } = useTaskModel();

  const [tabActiveKey, setTabActiveKey] = useState<string>(tab); //'task'-任务、'student'-学员
  const [radioValue, setRadioValue] = useState<number>(0); //0-当前、1-历史

  const tabList = [
    {
      tab: '任务管理',
      key: 'task',
    },
    {
      tab: '学员数据',
      key: 'student',
    },
  ];

  useEffect(() => {
    userListRequest({});
    groupListRequest({});
    getAllTaskList({});
  }, []);

  useEffect(() => {
    if (!studentFormRef.current) {
      return;
    }
    studentFormRef.current.submit();
  }, [radioValue]);

  const detailData = (r: any) => {
    const id = tabActiveKey === 'task' ? r.taskId : r.account;
    const title = tabActiveKey === 'task' ? r.taskName : r.userName;
    history.push(
      `/front/teacher/dataManage/detailData?id=${id}&title=${title}&tab=${tabActiveKey}`,
    );
  };

  const columns: any[] = [
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      width: 120,
      ellipsis: true,
      search: true,
      fieldProps: {
        placeholder: '请选择任务名称',
      },
      renderFormItem: () => (
        <Select
          mode="multiple"
          showSearch
          allowClear
          filterOption={(input, option) =>
            (option?.item?.taskName as unknown as string)
              ?.toLowerCase()
              ?.includes(input.toLowerCase())
          }
        >
          {allTableList?.map((item: any, index: any) => (
            <Select.Option key={index} value={item.id} item={item}>
              {item.taskName}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: '学员人数',
      dataIndex: 'taskUserCount',
      key: 'taskUserCount',
      width: 80,
      search: false,
    },
    {
      title: '完成人数',
      dataIndex: 'completeCount',
      key: 'completeCount',
      width: 80,
      search: false,
    },
    {
      title: '完成率',
      dataIndex: 'completeRate',
      key: 'completeRate',
      width: 80,
      search: false,
      render(t: any, r: any, i: any) {
        return formatePercent(t);
      },
    },
    {
      title: '人均练习次数',
      dataIndex: 'timesAvg',
      key: 'timesAvg',
      width: 110,
      search: false,
    },
    {
      title: '平均分',
      dataIndex: 'scoreAvg',
      key: 'scoreAvg',
      width: 80,
      search: false,
    },
    {
      title: '任务类型',
      dataIndex: 'taskType',
      key: 'taskType',
      width: 80,
      valueEnum: {
        1: { text: '培训' },
        2: { text: '考试' },
      },
    },
    {
      title: '任务状态',
      dataIndex: 'taskStatus',
      key: 'taskStatus',
      width: 80,
      valueEnum: {
        0: { text: '关闭', status: 'default' },
        1: { text: '打开', status: 'success' },
      },
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 80,
      search: true,
      renderFormItem: (t: any, r: any, i: any) => (
        <Select
          placeholder="请选择创建人"
          mode="multiple"
          showSearch
          allowClear
          filterOption={(input, option) =>
            (option?.item?.userName as unknown as string)
              ?.toLowerCase()
              ?.includes(input.toLowerCase())
          }
        >
          {userList?.map((item: any) => {
            return (
              <Select.Option key={item?.id} value={item?.account} item={item}>
                {item?.userName}
              </Select.Option>
            );
          })}
        </Select>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
      search: false,
    },
    {
      title: '操作',
      key: 'option',
      fixed: 'right',
      width: 150,
      valueType: 'option',
      render: (t: any, r: any, i: any) => {
        return (
          <div>
            <Button type="link" onClick={() => detailData(r)}>
              详细数据
            </Button>
          </div>
        );
      },
    },
  ];

  const studentColumns: any[] = [
    {
      title: '学员名称',
      dataIndex: 'userName',
      key: 'userName',
      width: 100,
      search: true,
      fieldProps: {
        placeholder: '请选择学员名称',
      },
      renderFormItem: () => (
        <Select
          placeholder="请选择学员名称"
          mode="multiple"
          showSearch
          allowClear
          filterOption={(input, option) =>
            (option?.item?.userName as unknown as string)
              ?.toLowerCase()
              ?.includes(input.toLowerCase())
          }
        >
          {userList?.map((item: any) => {
            return (
              <Select.Option key={item?.id} value={item?.account} item={item}>
                {item?.userName}
              </Select.Option>
            );
          })}
        </Select>
      ),
    },
    {
      title: '学员组别',
      dataIndex: 'groupName',
      key: 'groupName',
      width: 80,
      search: false,
    },
    {
      title: '部门组别',
      key: 'groupList',
      hideInTable: true,
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
          filterOption={(input, option) =>
            (option?.item?.groupName as unknown as string)
              ?.toLowerCase()
              ?.includes(input.toLowerCase())
          }
        >
          {groupList?.map((item: any) => {
            return (
              <Select.Option key={item?.id} value={item?.id} item={item}>
                {item?.groupName}
              </Select.Option>
            );
          })}
        </Select>
      ),
    },
    {
      title: radioValue === 1 ? '历史任务总数' : '任务总数',
      dataIndex: 'taskCount',
      key: 'taskCount',
      width: 80,
      search: false,
    },
    {
      title: radioValue === 1 ? '历史已完成考试数' : '已完成考试数',
      dataIndex: 'completeExamCount',
      key: 'completeExamCount',
      width: 100,
      search: false,
    },
    {
      title: '待完成考试数',
      dataIndex: 'unCompleteExamCount',
      key: 'unCompleteExamCount',
      width: 80,
      search: false,
      hideInTable: radioValue === 1,
    },
    {
      title: radioValue === 1 ? '历史已完成培训数' : '已完成培训数',
      dataIndex: 'completeTrainCount',
      key: 'completeTrainCount',
      width: 100,
      search: false,
    },
    {
      title: '待完成培训数',
      dataIndex: 'unCompleteTrainCount',
      key: 'unCompleteTrainCount',
      width: 80,
      search: false,
      hideInTable: radioValue === 1,
    },
    {
      title: '完成进度',
      dataIndex: 'completeRate',
      key: 'completeRate',
      width: 80,
      search: false,
      render(t: any, r: any, i: any) {
        return formatePercent(t);
      },
    },
    {
      title: '历史练习次数',
      dataIndex: 'trainTimes',
      key: 'trainTimes',
      width: 90,
      search: false,
    },
    {
      title: radioValue === 1 ? '历史平均分' : '平均分',
      dataIndex: 'scoreAvg',
      key: 'scoreAvg',
      width: 80,
      search: false,
    },
    {
      title: '操作',
      key: 'option',
      fixed: 'right',
      width: 120,
      valueType: 'option',
      render: (t: any, r: any, i: any) => {
        return (
          <div>
            <Button type="link" onClick={() => detailData(r)}>
              详细数据
            </Button>
          </div>
        );
      },
    },
  ];

  const renderProTable = (key: any) => {
    if (key === 'task') {
      return (
        <ProTable
          rowKey={(record: any) => record?.id}
          formRef={taskFormRef}
          headerTitle={'任务数据列表'}
          toolBarRender={() => []}
          options={false}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          search={{
            labelWidth: 100,
            span: 8,
            defaultCollapsed: false,
            collapseRender: () => null,
          }}
          columns={columns}
          scroll={{ x: columns?.length * 100 }}
          request={async (params = {}, sort, filter) => {
            return getTaskReport({ ...params });
          }}
        />
      );
    } else if (key === 'student') {
      return (
        <ProTable
          rowKey={(record: any) => record?.id}
          actionRef={studentActionRef}
          formRef={studentFormRef}
          headerTitle={'学员数据列表'}
          toolBarRender={() => [
            <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
              <Radio.Button value={0}>当前</Radio.Button>
              <Radio.Button value={1}>历史</Radio.Button>
            </Radio.Group>,
          ]}
          options={false}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          search={{
            labelWidth: 100,
            span: 8,
            defaultCollapsed: false,
            collapseRender: () => null,
          }}
          columns={studentColumns}
          scroll={{ x: studentColumns?.length * 100 }}
          request={async (params = {}, sort, filter) => {
            return getStudentReport({ ...params, type: radioValue });
          }}
        />
      );
    }
  };

  return (
    <Fragment>
      <PageContainer
        header={{
          title: '数据管理',
          breadcrumb: {},
        }}
        tabActiveKey={tabActiveKey}
        tabList={tabList}
        onTabChange={(key) => setTabActiveKey(key)}
      >
        <Tabs activeKey={tabActiveKey} tabBarStyle={{ display: 'none' }}>
          {tabList.map((item) => (
            <Tabs.TabPane key={item.key}>{renderProTable(item.key)}</Tabs.TabPane>
          ))}
        </Tabs>
      </PageContainer>
    </Fragment>
  );
};
