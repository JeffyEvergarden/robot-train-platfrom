import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useModel, history } from 'umi';
import ProTable from '@ant-design/pro-table';
import { Button, message, Input, Tag, Spin, Tooltip, Select } from 'antd';
import { PageContainer, ProBreadcrumb } from '@ant-design/pro-layout';
import { ArrowLeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useDataManageModel } from './model';
import { useTaskModel } from '../task/model';
import { useTableModel } from '../course/model';
import config from '@/config';
import style from './style.less';

const DetailData: any = (props: any) => {
  const query: any = history.location.query || {};

  const id: any = query?.id;
  const tab: any = query?.tab;
  const title: any = query?.title;
  //   const params: any = query?.params; //缓存参数

  const { getTaskReportDetail, getStudentReportDetail } = useDataManageModel();
  const { allTableList, getAllTaskList } = useTaskModel();
  const { allTableList: courseList, getAllTablelist: getCourseList } = useTableModel();
  const goBack = () => {
    if (!id) {
      console.log('获取不到id');
      return;
    }
    // 回到数据管理列表页面
    history.replace(`/front/teacher/dataManage/tablepage`, {
      tab,
    });
  };

  useEffect(() => {
    getAllTaskList({});
    getCourseList({});
  }, []);

  const detail = (r: any) => {
    console.log('分数详情');
  };

  const columns: any[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '开始时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
      search: false,
    },
    {
      title: '学员',
      dataIndex: 'userName',
      key: 'userName',
      width: 100,
      search: false,
    },
    {
      title: '课程名称',
      dataIndex: 'taskNodeName',
      key: 'taskNodeName',
      width: 100,
      ellipsis: true,
      search: true,
      renderFormItem: () => (
        <Select
          mode="multiple"
          showSearch
          allowClear
          filterOption={(input, option) =>
            (option?.item?.courseName as unknown as string)
              ?.toLowerCase()
              ?.includes(input.toLowerCase())
          }
        >
          {courseList?.map((item: any, index: any) => (
            <Select.Option key={index} value={item.id} item={item}>
              {item.courseName}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: '是否合格',
      dataIndex: 'studyPass',
      key: 'studyPass',
      width: 100,
      search: false,
      valueEnum: {
        0: { text: '否' },
        1: { text: '是' },
      },
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      width: 100,
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
            <Button type="link" onClick={() => detail(r)}>
              分数详情
            </Button>
          </div>
        );
      },
    },
  ];

  const studentColumns: any[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '开始时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
      search: false,
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      width: 100,
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
      title: '任务类型',
      dataIndex: 'taskType',
      key: 'taskType',
      width: 100,
      valueEnum: {
        1: { text: '培训' },
        2: { text: '考试' },
      },
    },
    {
      title: '课程名称',
      dataIndex: 'taskNodeName',
      key: 'taskNodeName',
      width: 100,
      ellipsis: true,
      search: true,
      fieldProps: {
        placeholder: '请选择课程名称',
      },
      renderFormItem: (t: any, r: any, i: any) => {
        return (
          <Select
            mode="multiple"
            showSearch
            allowClear
            filterOption={(input, option) =>
              (option?.item?.courseName as unknown as string)
                ?.toLowerCase()
                ?.includes(input.toLowerCase())
            }
          >
            {courseList?.map((item: any, index: any) => (
              <Select.Option key={index} value={item.id} item={item}>
                {item.courseName}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: '是否合格',
      dataIndex: 'studyPass',
      key: 'studyPass',
      width: 100,
      search: false,
      valueEnum: {
        0: { text: '否' },
        1: { text: '是' },
      },
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      width: 100,
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
            <Button type="link" onClick={() => detail(r)}>
              分数详情
            </Button>
          </div>
        );
      },
    },
  ];

  const renderProTable = (key: any) => {
    // key='task'
    let col = columns;
    let req = getTaskReportDetail;
    if (key === 'student') {
      col = studentColumns;
      req = getStudentReportDetail;
    }
    return (
      <ProTable
        rowKey={(record: any) => record?.id}
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
        columns={col}
        scroll={{ x: col?.length * 100 }}
        request={async (params = {}, sort, filter) => {
          return req({ ...params });
        }}
      />
    );
  };

  return (
    <PageContainer
      header={{
        title: '',
        ghost: true,
      }}
      content={
        <div className={style['detail-page']}>
          <div>
            <div className={style['title']}>
              <ArrowLeftOutlined onClick={goBack} style={{ marginRight: '8px' }} />
              <span style={{ marginRight: '8px' }}>{title}-详细数据</span>
            </div>
          </div>
        </div>
      }
    >
      {renderProTable(tab)}
    </PageContainer>
  );
};

export default DetailData;
