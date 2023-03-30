import React, { useRef, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Select } from 'antd';
import { useTableModel } from './model';
import { history, useModel } from 'umi';
import DuplicateForm from './components/duplicateForm';
import TableForm from './components/tableForm';
import style from './style.less';

const TeacherWeb: React.FC<any> = (props: any) => {
  const {
    allTableList,
    tableLoading,
    formLoading,
    getTableList,
    getAllTablelist,
    courseAdd,
    courseDetail,
    courseEdit,
    courseDelete,
    coursePublish,
    courseDown,
  } = useTableModel();

  const duplicateRef = useRef<any>(null);
  const tableFormRef = useRef<any>(null);
  const tableRef = useRef<any>(null);

  const { setCourseInfo } = useModel('course', (model: any) => ({
    setCourseInfo: model.setCourseInfo,
  }));

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
                  setCourseInfo(row);
                  history.push(`/teacher/course/draw?id=${row?.id}&name=${row?.courseName}`);
                }}
              >
                流程编辑
              </Button>

              <Popconfirm
                title="确定要发布吗？"
                okText="确定"
                cancelText="取消"
                disabled={row?.courseStatus == 1}
                onConfirm={async () => {
                  let res = await coursePublish({ id: row?.id });
                  if (res) {
                    tableRef?.current?.reload();
                  }
                }}
              >
                <Button type="link" disabled={row?.courseStatus == 1}>
                  发布
                </Button>
              </Popconfirm>

              <Popconfirm
                title={
                  <div>
                    <div>{'确定要下线吗？'}</div>
                    <div className={style['title-description']}>{'下线后课程将无法被选择配置'}</div>
                  </div>
                }
                okText="确定"
                cancelText="取消"
                disabled={row?.courseStatus == 0}
                onConfirm={async () => {
                  let res = await courseDown({ id: row?.id });
                  if (res) {
                    tableRef?.current?.reload();
                  }
                }}
              >
                <Button type="link" disabled={row?.courseStatus == 0}>
                  下线
                </Button>
              </Popconfirm>

              <Popconfirm
                title={
                  <div>
                    <div>{'确定要删除吗?'}</div>
                    <div className={style['title-description']}>{'删除后课程将消失'}</div>
                  </div>
                }
                okText="确定"
                cancelText="取消"
                onConfirm={async () => {
                  let res = await courseDelete({ id: row?.id });
                  if (res) {
                    tableRef?.current?.reload();
                  }
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
        actionRef={tableRef}
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
      <TableForm
        cref={tableFormRef}
        courseAdd={courseAdd}
        courseDetail={courseDetail}
        courseEdit={courseEdit}
        reload={() => {
          tableRef?.current?.reload();
        }}
        loading={formLoading}
      ></TableForm>
    </PageContainer>
  );
};

export default TeacherWeb;
