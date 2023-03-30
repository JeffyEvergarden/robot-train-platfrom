import ProTable from '@ant-design/pro-table';
import { Fragment, useRef, useState, useEffect } from 'react';
import { Divider, Button, Select, message, Space, notification, Popconfirm } from 'antd';
import { useIntentionModel } from './../model';
import { CloseCircleOutlined } from '@ant-design/icons';
import IntenModal from './intenModal';

import config from '@/config';
const successCode = config.successCode;

export default () => {
  const actionRef = useRef<any>();
  const intenModalRef = useRef<any>();

  const { customerIntentionList, intentListRequest, delIntent, intentAdd, intentEdit } =
    useIntentionModel();

  const [intentList, setIntentList] = useState<any>([]);

  useEffect(() => {
    getIntentList();
  }, []);

  const getIntentList = async () => {
    let res = await intentListRequest({ type: '1' });
    setIntentList(res?.data);
  };

  const getCustomerIntentionList = async (payload: any) => {
    let params = {
      ...payload,
      page: payload?.current,
      type: '1', //1-客户意图2-学员意图
    };
    delete params?.current;
    let res = await customerIntentionList(params);
    return {
      data: res?.data?.list,
      total: res?.data?.totalPage,
      current: payload?.current || 1,
      pageSize: payload?.pageSize || 10,
    };
  };

  const addCustomerIntention = () => {
    intenModalRef?.current?.open({}, 'add');
  };

  const editIntent = (record: any) => {
    intenModalRef?.current?.open(record, 'edit');
  };

  const comfirmSubmit = async (formVal: any, rowData: any, pageType: any) => {
    let params = {
      ...formVal,
      id: rowData?.id,
      modelId: '',
    };
    let res;
    if (pageType == 'add') {
      res = await intentAdd(params);
    } else if (pageType == 'edit') {
      res = await intentEdit(params);
    }
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc || '成功');
      intenModalRef?.current?.close();
      actionRef?.current?.reloadAndRest();
    } else {
      message.error(res?.resultDesc || '失败');
    }
  };

  const deleteIntent = async (record: any) => {
    let res = await delIntent(record);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc || '成功');
      actionRef?.current?.reloadAndRest();
    } else {
      const key = `open${Date.now()}`;
      notification.open({
        message: '',
        icon: <CloseCircleOutlined style={{ color: 'red' }} />,
        description: (
          <Fragment>
            <div>删除失败</div>
            <div>{res?.resultDesc || '该意图被应用于课程中，无法删除，请先删除课程中的意图'}</div>
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

  const columns: any[] = [
    {
      title: '意图名称',
      dataIndex: 'intentName',
      key: 'intentName',
      ellipsis: true,
      search: true,
      fieldProps: {
        placeholder: '请选择意图名称',
      },
      renderFormItem: () => (
        <Select optionFilterProp="children" showSearch allowClear placeholder="请选择部门组别">
          {intentList?.map((item: any) => {
            return (
              <Select.Option key={item?.id} value={item?.id}>
                {item?.intentName}
              </Select.Option>
            );
          })}
        </Select>
      ),
    },
    {
      title: '话术',
      dataIndex: 'intentText',
      key: 'intentText',
      ellipsis: true,
      search: false,
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
      title: '更新人',
      dataIndex: 'modifiedBy',
      key: 'modifiedBy',
      ellipsis: true,
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      ellipsis: true,
      search: false,
    },
    {
      title: '操作',
      key: 'option',
      fixed: 'right',
      width: 300,
      valueType: 'option',
      render: (t: any, r: any, i: any) => {
        return (
          <div>
            <Space>
              <Button type="link" onClick={() => editIntent(r)}>
                编辑
              </Button>
              <Divider type="vertical" />
              <Popconfirm
                title="你确定要删除这个意图吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => deleteIntent(r)}
              >
                <Button type="link" danger>
                  删除
                </Button>
              </Popconfirm>
            </Space>
          </div>
        );
      },
    },
  ];
  return (
    <Fragment>
      <ProTable
        rowKey={(record: any) => record?.id}
        actionRef={actionRef}
        headerTitle="意图列表"
        toolBarRender={() => [
          <Button type="primary" key="sameStep" onClick={addCustomerIntention}>
            新建
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
        columns={columns}
        scroll={{ x: columns?.length * 150 }}
        request={async (params = {}, sort, filter) => {
          return getCustomerIntentionList({ ...params });
        }}
      />
      <IntenModal cref={intenModalRef} comfirmSubmit={comfirmSubmit} />
    </Fragment>
  );
};
