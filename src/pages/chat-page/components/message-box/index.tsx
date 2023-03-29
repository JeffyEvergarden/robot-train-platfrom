import React, { useEffect, useRef, useState } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import DelayTextInput from './delay-text';
import DelayTime from './delay-time';
import RightChatContent from './chat-right';
import style from './style.less';

// 头像
import customerPhoto from '@/asset/image/customer.png';
import robotPhoto from '@/asset/image/robot.png';









// 消息盒子
const MessageBox: React.FC<any> = (props: any) => {

  const { list } = props;


  return (
    <>
      {
        list.map((item: any, index: any) => {

          const lastType: any = index >= 1 ? list[index - 1]?.type : null;

          // type 类型
          // text 文本内容
          // keysTips 关键点提示 （flag， desc）
          // 需要的秒数
          // status  （loading / ）

          const { type, text, role, keysTips, delay = 0, status } = item;

          if (type === 'customer') {
            //// 左边内容
            return (
              <div className={style['box_customer']} key={index}>

                <div className={style['box-avator']}>
                  {lastType !== type && <img className={style['avator']} src={customerPhoto} alt='客方'></img>}
                </div>
                <div className={style['box-bg']}>
                  <DelayTime text={text} delay={delay} />
                  <div className={`${style['box-content']}`}>
                    <DelayTextInput text={text} delay={delay}></DelayTextInput>
                  </div>
                </div>
              </div>
            )

          } else if (type === 'system') {
            // 右边内容
            return (
              <RightChatContent
                key={index}
                status={status}
                text={text}
                keysTips={keysTips}
                showAvator={lastType !== type}
              />
            )
          } else if (type === 'tips') {
            // 中间提示
            return (
              <div className={style['box_tips']} key={index}>
                <div className={style['box_tips_text']}>{text}</div>
              </div>
            )
          } else {
            return null;
          }
        })
      }
    </>
  )

}


export default MessageBox;