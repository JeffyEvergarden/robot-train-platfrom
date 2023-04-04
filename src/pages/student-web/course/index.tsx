import React, { useState } from "react";
import { PageContainer, ProBreadcrumb } from '@ant-design/pro-layout';
import { Tabs } from 'antd';
import SearchPage from './search-page';
import style from './style.less';



const StudentWeb: React.FC<any> = (props: any) => {

  const [activeKey, setActiveKey] = useState<any>('1')

  const tabOnChange = (key: any) => {
    setActiveKey(key);
  }


  // 0 待学习， 1已学习

  const pagesItem: any = [
    {
      label: '待学习课',
      key: '1',
      children: <SearchPage type={0}></SearchPage>
    },
    {
      label: '已学习课',
      key: '2',
      children: <SearchPage type={1}></SearchPage>
    }
  ]


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
        >
          {
            pagesItem.map((item: any, index: any) => {
              return (
                <Tabs.TabPane tab={item.label} key={item.key}>

                  {item.children}

                </Tabs.TabPane>
              )
            })
          }

        </Tabs>
      </div>
    </PageContainer>

  )

}



export default StudentWeb;