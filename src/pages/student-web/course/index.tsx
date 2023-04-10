import React, { useEffect, useState } from 'react';
import { PageContainer, ProBreadcrumb } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import SearchPage from './search-page';
import style from './style.less';
import { useCourseModel } from './model';

const StudentWeb: React.FC<any> = (props: any) => {
  const { studyNum } = useCourseModel();

  const [activeKey, setActiveKey] = useState<any>('1');
  const [waitNum, setWaitNum] = useState<any>(0);
  const [doneNum, setDoneNum] = useState<any>(0);

  useEffect(() => {
    getStudyNum();
  }, []);

  const getStudyNum = async () => {
    let res = await studyNum({});
    setWaitNum(res?.data?.unStudyNum);
    setDoneNum(res?.data?.studyNum);
  };

  const tabOnChange = (key: any) => {
    setActiveKey(key);
  };

  // 0 待学习， 1已学习

  const pagesItem: any = [
    {
      label: `待学习课${waitNum}`,
      key: '1',
      children: <SearchPage type={0} />,
    },
    {
      label: `已学习课${doneNum}`,
      key: '2',
      children: <SearchPage type={1} />,
    },
  ];

  return (
    <PageContainer
      header={{
        title: '我的课程',
        ghost: true,
      }}
    >
      <div className={style['page-bg']}>
        <Tabs activeKey={activeKey} onChange={tabOnChange} size={'large'} items={[]}>
          {pagesItem.map((item: any, index: any) => {
            return (
              <Tabs.TabPane tab={item.label} key={item.key}>
                {item.children}
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default StudentWeb;
