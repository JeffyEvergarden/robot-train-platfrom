import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useTableModel } from '../model';

const TeacherWeb: React.FC<any> = (props: any) => {
  const { tableList, tableLoading, getTableList } = useTableModel();

  let columns: any = [
    {
      title: '课程名称',
      dataIndex: 'courseName',
    },
    {
      title: '课程样式',
      dataIndex: 'courseStyle',
    },
    {
      title: '合格分',
      dataIndex: 'point',
    },
    {
      title: '课程状态',
      dataIndex: 'courseType',
    },
    {
      title: '创建者',
      dataIndex: 'creator',
    },
    {
      title: '操作',
      dataIndex: 'op',
      fixed: 'right',
      width: 350,
      render: (val: any, row: any, index: number) => {
        return (
          <>
            <div style={{ display: 'flex' }}>
              <Button
                type="text"
                onClick={() => {
                  // viewReport(row);
                }}
              >
                信息编辑
              </Button>

              <Button
                type="text"
                // onClick={() => exportFile(row)}
              >
                流程编辑
              </Button>

              <Popconfirm
                title="点击发布课程，请确认！"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  // deleteRow(row);
                }}
              >
                <Button type="text">发布</Button>
              </Popconfirm>

              <Popconfirm
                title="点击后课程将下线
                无法选择配置，请确认"
                okText="确定"
                cancelText="取消"
                onConfirm={() => {
                  // deleteRow(row);
                }}
              >
                <Button type="text">下线</Button>
              </Popconfirm>

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
        title: '课程管理',
        ghost: true,
      }}
    >
      <ProTable
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
        toolBarRender={() => {
          return [<Button>复制</Button>, <Button type="primary">新建</Button>];
        }}
        search={{
          labelWidth: 100,
        }}
        columns={columns}
        scroll={{ x: columns.length * 200, y: 480 }}
        rowKey="id"
        loading={tableLoading}
        request={() => {
          return getTableList();
        }}
      />
    </PageContainer>
  );
};

export default TeacherWeb;
