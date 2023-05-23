import React, { useEffect, useState, useRef } from 'react';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Space, Table, Tag, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, WomanOutlined, ManOutlined, DownOutlined } from '@ant-design/icons';
import style from './style.less';
import { useStudentRankModel } from './model';
import { useUpdateEffect, useMount } from 'ahooks';
import type { ColumnsType } from 'antd/es/table';

const WorkplaceManage: React.FC<any> = (props: any) => {
  return (
    <PageContainer
      header={{
        title: '首页',
        ghost: true,
      }}
    >
      职场管理
    </PageContainer>
  );
};

export default WorkplaceManage;
