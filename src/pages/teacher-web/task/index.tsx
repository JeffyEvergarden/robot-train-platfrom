import React, { useRef, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Select, Switch } from 'antd';
import { useTaskModel } from './model';
import { history } from 'umi';
import TableForm from './components/tableForm';

const TeacherWeb: React.FC<any> = (props: any) => {
  const {
    allTableList,
    tableLoading,
    formLoading,
    getAllTaskList,
    getTaskPage, // 获取表格数据
    taskAdd,
    taskDetail,
    taskEdit,
    taskDelete,
    taskOpen,
    taskClose,
  } = useTaskModel();

  const tableFormRef = useRef<any>(null);
  const tableRef = useRef<any>(null);

  let columns: any = [
    {
      title: '任务名称',
      dataIndex: 'taskName',
      search: false,
    },
    {
      title: '任务名称',
      dataIndex: 'taskIdList',
      hideIntable: true,
      renderFormItem: (t: any, r: any, i: any) => {
        return (
          <Select mode="multiple" showSearch allowClear>
            {allTableList?.map((item: any, index: any) => (
              <Select.Option key={index} value={item.id}>
                {item.taskName}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: '任务进度',
      dataIndex: 'progress',
      valueEnum: {
        0: { text: '未发布', status: 'default' },
        1: { text: '已完成', status: 'success' },
        2: { text: '未完成', status: 'warning' },
      },
    },
    {
      title: '任务模式',
      dataIndex: 'taskModel',
      valueEnum: {
        1: { text: '闯关模式' },
        2: { text: '任意模式' },
      },
    },
    {
      title: '任务类型',
      dataIndex: 'taskType',
      search: false,
      valueEnum: {
        1: { text: '培训' },
        2: { text: '考试' },
      },
    },
    {
      title: '合格进度',
      dataIndex: 'passScore',
      search: false,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
    },
    {
      title: '任务状态',
      dataIndex: 'taskStatus',
      valueEnum: {
        0: { text: '关闭' },
        1: { text: '开启' },
      },
      render: (val: any, row: any) => {
        return (
          <Switch
            checked={row?.taskStatus}
            onChange={async (flag: any) => {
              let res: any;
              if (flag) {
                res = await taskOpen({ id: row?.id });
              } else {
                res = await taskClose({ id: row?.id });
              }
              if (res) {
                tableRef?.current?.reload();
              }
            }}
          />
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'op',
      search: false,
      fixed: 'right',
      width: 200,
      render: (val: any, row: any, index: number) => {
        return (
          <>
            <div style={{ display: 'flex' }}>
              <Button
                type="link"
                onClick={() => {
                  tableFormRef?.current?.open('edit', row);
                }}
              >
                {row?.taskStatus == 1 ? '查看' : '编辑'}
              </Button>

              <Button
                type="link"
                onClick={() => {
                  history.push(`/teacher/task/draw?id=${row.id}&name=${row.taskName}`);
                }}
                disabled={row?.taskStatus}
              >
                流程编辑
              </Button>

              <Popconfirm
                title="确定要删除吗？"
                okText="确定"
                cancelText="取消"
                disabled={row?.taskStatus}
                onConfirm={async () => {
                  let res = await taskDelete({ id: row?.id });
                  if (res) {
                    tableRef?.current?.reload();
                  }
                }}
              >
                <Button type="link" danger disabled={row?.taskStatus}>
                  删除
                </Button>
              </Popconfirm>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <PageContainer
      header={{
        title: '任务管理',
        ghost: true,
      }}
    >
      <ProTable
        actionRef={tableRef}
        headerTitle={'任务列表'}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              onClick={() => {
                tableFormRef?.current?.open('add');
              }}
            >
              新建
            </Button>,
          ];
        }}
        search={{
          labelWidth: 100,
          span: 8,
          defaultCollapsed: false,
          collapseRender: () => null,
        }}
        columns={columns}
        scroll={{ x: columns.length * 180, y: 400 }}
        rowKey="id"
        loading={tableLoading}
        request={async (params = {}, sort, filter) => {
          await getAllTaskList({});
          return getTaskPage({ page: params?.current, ...params });
        }}
      />
      {/* 新增编辑表单 */}
      <TableForm
        cref={tableFormRef}
        taskAdd={taskAdd}
        taskDetail={taskDetail}
        taskEdit={taskEdit}
        reload={() => {
          tableRef?.current?.reload();
        }}
        loading={formLoading}
      ></TableForm>
    </PageContainer>
  );
};

export default TeacherWeb;
