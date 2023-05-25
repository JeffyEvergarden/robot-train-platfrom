import { Fragment, useEffect, useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { history, useModel } from 'umi';
import { Tabs } from 'antd';
import styles from './../index.less';
import CustomerIntention from '../components/customerIntention';
import StudentIntent from './../components/studentIntent';

export default () => {
  const query: any = history.location.query || {};

  const title: any = query?.title;

  useEffect(() => {}, []);

  return (
    <div className={styles.commonTabsSty}>
      <PageContainer
        header={{
          title: title,
          breadcrumb: {},
        }}
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane key={'1'} tab="客户意图">
            <CustomerIntention />
          </Tabs.TabPane>
          <Tabs.TabPane key={'2'} tab="学员意图">
            <StudentIntent />
          </Tabs.TabPane>
        </Tabs>
      </PageContainer>
    </div>
  );
};
