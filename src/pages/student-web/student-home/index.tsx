import React, { useEffect, useState, useRef } from 'react';
import { history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Space, Table, Tag, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, WomanOutlined, ManOutlined, DownOutlined } from '@ant-design/icons';
import style from './style.less';
import { useStudentRankModel } from './model';
import { useUpdateEffect, useMount } from 'ahooks';
import type { ColumnsType } from 'antd/es/table';

import female from '@/asset/image/female.png';
import male from '@/asset/image/male.png';
import rank_1 from '@/asset/image/rank_1.png';
import rank_2 from '@/asset/image/rank_2.png';
import rank_3 from '@/asset/image/rank_3.png';

const rankTop3Imgs = [rank_1, rank_2, rank_3];

const columns: ColumnsType<any> = [
  {
    title: '排名',
    dataIndex: 'rank',
    key: 'rank',
    width: 72,
    align: 'center',
    render: (rank) => {
      const idx = rank - 1;
      if (idx < 3) {
        const rankImg = rankTop3Imgs[idx];
        return <img src={rankImg} alt={`${rank}`} style={{ width: '24px', height: '22px' }} />;
      }
      return rank;
    },
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    key: 'userName',
    align: 'center',
  },
  {
    title: '部门',
    dataIndex: 'groupName',
    key: 'groupName',
    align: 'center',
  },
  {
    title: '分值',
    dataIndex: 'score',
    key: 'score',
    width: 100,
    align: 'center',
  },
];

const StudentHome: React.FC<any> = (props: any) => {
  const {
    loading,
    setLoading,
    // 排名分组接口
    getStudentGroup,
    studentGroupInfo,
    // 成绩排名接口
    getScoreSort,
    scoreSortData,
  } = useStudentRankModel();

  const [courseType, setCourseType] = useState<any>('0');
  const [courseTypeName, setCourseTypeName] = useState<any>('全部');

  const onMenuClick = (e: any) => {
    console.log(e);
    setCourseType(e.key);
    let obj: any = studentGroupInfo?.dropItems?.find((item: any) => {
      return item.key === e.key;
    });
    obj && setCourseTypeName(obj.label);
  };

  const getTableRowClassName = (record: any, index: any) => {
    if (record?.isMe) return 'isMe';
    return '';
  };

  useMount(() => {
    getStudentGroup({});
    getScoreSort({});
  });

  useUpdateEffect(() => {
    let params = {};
    if (courseType === '1') {
      params = { groupId: studentGroupInfo?.id };
    }
    getStudentGroup(params);
  }, [courseTypeName]);

  return (
    <PageContainer
      header={{
        title: '首页',
        ghost: true,
      }}
    >
      <div className={style.container}>
        <div className={style.leftContainer}>
          <div className={style.leftTopContainer}>
            <div className={style.ltcAvatarContainer}>
              <Avatar size={40} icon={<UserOutlined />} src={female} />
              <span className={style.ltcTitle}>张三三</span>
              <WomanOutlined className={style.womanOutlined} />
              <ManOutlined className={style.manOutlined} />
            </div>
            <div className={style.ltcInfoContainer}>
              <div className={style.ltcInfoItem}>
                <div className={style.infoTitle}>组别</div>
                <div className={style.infoDesc}>M1 4-10</div>
              </div>
              <div className={style.ltcInfoItem}>
                <div className={style.infoTitle}>手机号码</div>
                <div className={style.infoDesc}>15512341234</div>
              </div>
              <div className={style.ltcInfoItem}>
                <div className={style.infoTitle}>账户名称</div>
                <div className={style.infoDesc}>uzhangsansan</div>
              </div>
              <div className={style.ltcInfoItem}>
                <div className={style.infoTitle}>注册时间</div>
                <div className={style.infoDesc}>2022-12-06</div>
              </div>
            </div>
          </div>
          <Card title="最新通知" extra={<a href="#">更多</a>}>
            <p>请所有学员在11月26日前完成考试1的考试考试考...</p>
            <p>请所有学员在11月26日前完成考试1的考试考试考...</p>
            <p>请所有学员在11月26日前完成考试1的考试考试考...</p>
            <p>请所有学员在11月26日前完成考试1的考试考试考...</p>
            <p>请所有学员在11月26日前完成考试1的考试考试考...</p>
            <p>请所有学员在11月26日前完成考试1的考试考试考...</p>
          </Card>
        </div>
        <div className={style.rightContainer}>
          <div className={style.rcHeader}>
            <div className={style.rchTitle}>排名</div>
            <Dropdown
              className={style.rchDropdown}
              overlay={
                <Menu onClick={onMenuClick}>
                  {studentGroupInfo?.dropItems?.map((item: any, index: any) => {
                    return (
                      <Menu.Item key={item.key}>
                        {item.key === courseType ? (
                          <a style={{ color: '#1890FF' }}>{item.label}</a>
                        ) : (
                          item.label
                        )}
                      </Menu.Item>
                    );
                  })}
                </Menu>
              }
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '15px',
                }}
              >
                <span style={{ marginRight: '3px' }}>{courseTypeName}</span>
                <DownOutlined style={{ marginLeft: '4px', color: 'rgba(0,0,0,0.4)' }} />
              </div>
            </Dropdown>
          </div>
          <div className={style.rcBody}>
            <Table
              columns={columns}
              dataSource={scoreSortData.rankList}
              pagination={false}
              rowClassName={getTableRowClassName}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default StudentHome;
