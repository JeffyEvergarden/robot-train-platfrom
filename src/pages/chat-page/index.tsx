import React, { useEffect, useRef, useState } from 'react';

import { useChatModel } from './model';
import MessageBox from './components/message-box';
import style from './style.less';
import testList from './test';

const ChatPage: any = (props: any) => {


  const { getCourseInfo } = useChatModel();


  const [title, setTitle] = useState<any>('');

  // contentRef
  const contentRef = useRef<any>(null);


  const getInfo = async () => {
    let res: any = await getCourseInfo();
    setTitle(res.name);
  }


  useEffect(() => {
    // 获取基础信息
    getInfo();
  }, [])



  return (
    <div className={style['chat-page']}>
      <div className={style['page-left']}>
        {/* 标题模块 */}
        <div className={style['page-header']}>
          <div className={style['title']}>{title}</div>
        </div>

        <div className={style['page-content']} ref={contentRef}>
          <MessageBox list={testList}></MessageBox>
        </div>
      </div>

      <div className={style['page-right']}>
        <div className={style['page-tips-box']}></div>
        <div className={style['page-step-box']}></div>
      </div>
    </div>
  );
};

export default ChatPage;
