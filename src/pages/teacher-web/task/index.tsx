import React, { useRef, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useTableModel } from '../model';
import { history } from 'umi';
import DuplicateForm from './components/duplicateForm';
import TableForm from './components/tableForm';

const TeacherWeb: React.FC<any> = (props: any) => {
  const { tableList, tableLoading, getTableList } = useTableModel();

  const duplicateRef = useRef<any>(null);
  const tableFormRef = useRef<any>(null);

  let columns: any = [
    {
      title: '任务名称',
      dataIndex: 'courseName',
    },
    {
      title: '任务进度',
      dataIndex: 'point',
    },
    {
      title: '任务模式',
      dataIndex: 'courseType',
    },
    {
      title: '任务类型',
      dataIndex: 'courseStyle',
      search: false,
    },
    {
      title: '合格进度',
      dataIndex: 'creator',
      search: false,
    },
    {
      title: '创建人',
      dataIndex: 'courseStyle',
    },
    {
      title: '任务状态',
      dataIndex: 'creator',
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
                  tableFormRef?.current?.open('edit');
                }}
              >
                编辑
              </Button>

              <Button
                type="link"
                onClick={() => {
                  history.push(`/teacher/task/draw?id=${row.id}`);
                }}
              >
                流程编辑
              </Button>

              <Popconfirm
                title="删除后将消失，请确认！"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  // deleteRow(row);
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
        title: '任务管理',
        ghost: true,
      }}
    >
      <ProTable
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
        request={() => {
          return getTableList();
        }}
      />
      {/* 新增编辑表单 */}
      <TableForm cref={tableFormRef}></TableForm>
    </PageContainer>
  );
};

export default TeacherWeb;
