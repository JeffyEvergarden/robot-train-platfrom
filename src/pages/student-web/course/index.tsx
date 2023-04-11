import React, { useEffect, useState } from 'react';
import { PageContainer, ProBreadcrumb } from '@ant-design/pro-layout';
import { Tabs, Tag } from 'antd';
import SearchPage from './search-page';
import style from './style.less';
import { useCourseModel } from './model';



const TagIcon = (props: any) => {

  const { value, activeKey, num } = props;

  if (value === activeKey) {
    return <span className={style['tag-icon-active']} style={{ marginLeft: '8px' }}>{num}</span>
  } else {
    return <span className={style['tag-icon']} style={{ marginLeft: '8px' }}>{num}</span>
  }

}

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
      label: <span>待学习课<TagIcon value={'1'} activeKey={activeKey} num={waitNum} /></span>,
      key: '1',
      children: <SearchPage type={0} />,
    },
    {
      label: <span>已学习课<TagIcon value={'2'} activeKey={activeKey} num={doneNum} /></span>,
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
