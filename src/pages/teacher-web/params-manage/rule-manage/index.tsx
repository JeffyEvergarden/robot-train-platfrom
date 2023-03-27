import React, { Fragment, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import styles from './../index.less';
import ScoreSet from './../components/scoreSet';
import ServiceSet from './../components/serviceSet';
import DialogCom from './../components/dialogCom';

const RuleManage: React.FC = (props: any) => {
  return (
    <div className={styles.commonTabsSty}>
      <PageContainer
        header={{
          title: '规则管理',
          breadcrumb: {},
        }}
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="评分比例配置" key="1">
            <ScoreSet />
          </Tabs.TabPane>
          <Tabs.TabPane tab="服务规则配置" key="2">
            <ServiceSet />
          </Tabs.TabPane>
          <Tabs.TabPane tab="话术合格配置" key="3">
            <DialogCom />
          </Tabs.TabPane>
        </Tabs>
      </PageContainer>
    </div>
  );
};

export default RuleManage;
