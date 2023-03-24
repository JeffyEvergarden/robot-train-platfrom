import React, { useRef, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Select } from 'antd';
import { useTableModel } from '../model';
import { history } from 'umi';
import DuplicateForm from './components/duplicateForm';
import TableForm from './components/tableForm';

const TeacherWeb: React.FC<any> = (props: any) => {
  const {
    allTableList,
    tableLoading,
    getTableList,
    getAllTablelist,
    courseAdd,
    courseEdit,
    courseDelete,
    coursePublish,
    courseDown,
  } = useTableModel();

  const duplicateRef = useRef<any>(null);
  const tableFormRef = useRef<any>(null);

  let columns: any = [
    {
      title: '课程名称',
      dataIndex: 'courseName',
      search: false,
    },
    {
      title: '课程名称',
      dataIndex: 'courseId',
      hideInTable: true,
      renderFormItem: (t: any, r: any, i: any) => {
        return (
          <Select mode="multiple" showSearch allowClear>
            {allTableList?.map((item: any, index: any) => (
              <Select.Option key={index} value={item.id}>
                {item.courseName}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: '合格分',
      dataIndex: 'passMark',
      search: false,
    },
    {
      title: '课程状态',
      dataIndex: 'courseStatus',
      valueEnum: {
        0: { text: '未上线', status: 'default' },
        1: { text: '已发布', status: 'success' },
      },
    },
    {
      title: '课程样式',
      dataIndex: 'courseType',
      valueEnum: {
        0: { text: '常规' },
        1: { text: '剧情' },
      },
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'op',
      search: false,
      fixed: 'right',
      width: 320,
      render: (val: any, row: any, index: number) => {
        return (
          <>
            <div style={{ display: 'flex' }}>
              <Button
                type="link"
                onClick={() => {
                  tableFormRef?.current?.open('edit');
                }}
              >
                信息编辑
              </Button>

              <Button
                type="link"
                onClick={() => {
                  history.push(`/teacher/course/draw?id=${row.id}`);
                }}
              >
                流程编辑
              </Button>

              <Popconfirm
                title="点击发布课程，请确认！"
                okText="确定"
                cancelText="取消"
                disabled={row?.courseStatus == 1}
                onConfirm={() => {
                  // deleteRow(row);
                }}
              >
                <Button type="link" disabled={row?.courseStatus == 1}>
                  发布
                </Button>
              </Popconfirm>

              <Popconfirm
                title="点击后课程将下线
                无法选择配置，请确认"
                okText="确定"
                cancelText="取消"
                disabled={row?.courseStatus == 0}
                onConfirm={() => {
                  // deleteRow(row);
                }}
              >
                <Button type="link" disabled={row?.courseStatus == 0}>
                  下线
                </Button>
              </Popconfirm>

              <Popconfirm
                title="删除后将消失，请确认！"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  courseDelete();
                }}
              >
                <Button type="link" danger>
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
        title: '课程管理',
        ghost: true,
      }}
    >
      <ProTable
        headerTitle={'课程管理'}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
        toolBarRender={() => {
          return [
            <Button
              onClick={() => {
                duplicateRef?.current?.open();
              }}
            >
              复制
            </Button>,
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
        scroll={{ x: columns.length * 200, y: 400 }}
        rowKey="id"
        loading={tableLoading}
        request={async (params = {}, sort, filter) => {
          await getAllTablelist();
          return getTableList({ page: params?.current, ...params });
        }}
      />
      {/* //复制弹窗 */}
      <DuplicateForm cref={duplicateRef}></DuplicateForm>
      {/* 新增编辑表单 */}
      <TableForm cref={tableFormRef} courseAdd={courseAdd} courseEdit={courseEdit}></TableForm>
    </PageContainer>
  );
};

export default TeacherWeb;
