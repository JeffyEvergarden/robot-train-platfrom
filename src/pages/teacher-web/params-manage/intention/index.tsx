import { Fragment, useEffect, useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { history, useModel } from 'umi';
import { Tabs } from 'antd';
import styles from './../index.less';
import CustomerIntention from '../components/customerIntention';

export default () => {
  const actionRef = useRef<any>();

  const [rowInfo, setRowInfo] = useState<any>({});

  useEffect(() => {
    let historyData = history?.location || {};
    let rowInfo = historyData?.state?.rowInfo || {};
    setRowInfo(rowInfo);
  }, [history]);

  return (
    <div className={styles.commonTabsSty}>
      <PageContainer
        header={{
          title: rowInfo?.modelName ?? '',
          breadcrumb: {},
        }}
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane key={'1'} tab="客户意图">
            <CustomerIntention />
          </Tabs.TabPane>
          <Tabs.TabPane key={'2'} tab="学员意图">
            学员意图
          </Tabs.TabPane>
        </Tabs>
      </PageContainer>
    </div>
  );
};
