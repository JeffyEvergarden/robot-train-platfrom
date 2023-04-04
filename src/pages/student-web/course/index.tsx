import React, { useState, useRef } from 'react';
import { PageContainer, ProBreadcrumb } from '@ant-design/pro-layout';
import { Button, Select, Tabs } from 'antd';
import WaitLearnPage from './wait-learn-page';
import style from './style.less';

import { useCourseModel } from './model';

const StudentWeb: React.FC<any> = (props: any) => {
  const WaitLearnPageRef = useRef<any>();

  const [activeKey, setActiveKey] = useState<any>('1');

  const [courseKeyWait, setCourseKeyWait] = useState<any>(3);
  const [courseKeyDone, setCourseKeyDone] = useState<any>(3);

  const { totalWait, totalDone, courselist, getStudentCourse } = useCourseModel();

  const tabOnChange = (key: any) => {
    setActiveKey(key);
  };

  const changeCourse = (val: any) => {
    if (activeKey == '1') {
      setCourseKeyWait(Number(val));
    } else {
      setCourseKeyDone(Number(val));
    }
  };

  const pagesItem: any = [
    {
      label: `待学习课${totalWait}`,
      key: '1',
      children: (
        <WaitLearnPage
          type={0}
          courseKey={courseKeyWait}
          courselist={courselist}
          getStudentCourse={getStudentCourse}
          total={totalWait}
        />
      ),
    },
    {
      label: `已学习课${totalDone}`,
      key: '2',
      children: (
        <WaitLearnPage
          type={1}
          courseKey={courseKeyDone}
          courselist={courselist}
          getStudentCourse={getStudentCourse}
          total={totalDone}
        />
      ),
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
        <Tabs
          activeKey={activeKey}
          onChange={tabOnChange}
          size={'large'}
          items={[]}
          tabBarExtraContent={
            <Select className={style['select-box']} defaultValue={3} onChange={changeCourse}>
              <Select.Option key={3} value={3}>
                全部课程
              </Select.Option>
              <Select.Option key={1} value={1}>
                培训课程
              </Select.Option>
              <Select.Option key={2} value={2}>
                考试课程
              </Select.Option>
            </Select>
          }
        >
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
