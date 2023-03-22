import React, { useEffect, useRef, useState } from 'react';

import style from './style.less';

const ChatPage: any = (props: any) => {
  return (
    <div className={style['chat-page']}>
      <div className={style['page-left']}>
        <div className={style['page-header']}>
          <div className={style['title']}></div>
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
