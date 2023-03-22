import React, { Fragment, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Form, Input, Select, Cascader, DatePicker, Tabs, Space } from 'antd';
import type { TabsProps } from 'antd';
import styles from './../index.less';

const UserManage: React.FC = (props: any) => {
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
            用户管理
          </Tabs.TabPane>
          <Tabs.TabPane tab="组别管理" key="2">
            组别管理
          </Tabs.TabPane>
        </Tabs>
      </PageContainer>
    </div>
  );
};

export default UserManage;
