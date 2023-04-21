import ProTable from '@ant-design/pro-table';
import { Fragment, useRef, useState, useEffect } from 'react';
import { Divider, Button, Select, message, Space, notification, Popconfirm } from 'antd';
import { useIntentionModel } from './../model';

import config from '@/config';
const successCode = config.successCode;

export default () => {
  const actionRef = useRef<any>();

  const { intentListRequest, customerIntentionList, intentSync } = useIntentionModel();

  const [intentList, setIntentList] = useState<any>([]);

  useEffect(() => {
    getIntentList();
  }, []);

  const getIntentList = async () => {
    let res = await intentListRequest({ type: '2' });
    setIntentList(res?.data);
  };

  const getCustomerIntentionList = async (payload: any) => {
    let params = {
      ...payload,
      page: payload?.current,
      type: '2', //1-客户意图2-学员意图
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

  const syncStudent = async () => {
    let params = {
      modelId: '',
    };
    let res = await intentSync(params);
    if (res?.resultCode == successCode) {
      message.success(res?.resultDesc || '成功');
      actionRef?.current?.reloadAndRest();
    } else {
      message.error(res?.resultDesc || '失败');
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
        <Select optionFilterProp="children" showSearch allowClear placeholder="请选择意图名称">
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
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
      search: false,
    },
    {
      title: '同步人',
      dataIndex: 'modifiedBy',
      key: 'modifiedBy',
      ellipsis: true,
      search: false,
    },
  ];

  return (
    <Fragment>
      <ProTable
        rowKey={(record: any) => record?.id}
        actionRef={actionRef}
        headerTitle="意图列表"
        toolBarRender={() => [
          <Button type="primary" key="sameStep" onClick={syncStudent}>
            同步
          </Button>,
        ]}
        options={false}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
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
    </Fragment>
  );
};
