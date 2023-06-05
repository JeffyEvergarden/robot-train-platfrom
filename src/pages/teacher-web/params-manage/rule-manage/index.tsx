import React, { Fragment, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import { useModel } from 'umi';
import styles from './../index.less';
import ScoreSet from './../components/scoreSet';
import ServiceSet from './../components/serviceSet';
import DialogCom from './../components/dialogCom';

const RuleManage: React.FC = (props: any) => {
  // 用户信息
  const { initialState } = useModel('@@initialState');
  const { userInfoAll } = (initialState?.currentUser as any) || {};
  const { menuBtns } = userInfoAll || {};
  return (
    <div className={styles.commonTabsSty}>
      <PageContainer
        header={{
          title: '规则管理',
          breadcrumb: {},
        }}
      >
        <Tabs defaultActiveKey="1" destroyInactiveTabPane>
          {menuBtns?.includes('paramsManage_ruleManage_score_btn') ? (
            <Tabs.TabPane tab="评分比例配置" key="1">
              <ScoreSet />
            </Tabs.TabPane>
          ) : undefined}
          {menuBtns?.includes('paramsManage_ruleManage_service_btn') ? (
            <Tabs.TabPane tab="服务规则配置" key="2">
              <ServiceSet />
            </Tabs.TabPane>
          ) : undefined}
          {menuBtns?.includes('paramsManage_ruleManage_dialogCom_btn') ? (
            <Tabs.TabPane tab="话术合格配置" key="3">
              <DialogCom />
            </Tabs.TabPane>
          ) : undefined}
        </Tabs>
      </PageContainer>
    </div>
  );
};

export default RuleManage;
