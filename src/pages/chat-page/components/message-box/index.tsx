import React, { useEffect, useRef, useState } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';

import style from './style.less';

// 头像
import customerPhoto from '@/asset/image/customer.png';
import robotPhoto from '@/asset/image/robot.png';

// 关键点提醒
const KeyTipsHtml: React.FC<any> = (props: any) => {
  const { list } = props;

  if (!Array.isArray(list)) {
    return null;
  }

  return (
    <div className={style['keys-box']}>
      {list.map((subItem: any, i: number) => {
        let icon = subItem?.flag ? (
          <CheckCircleOutlined style={{ color: '#20C783', marginRight: '8px' }} />
        ) : (
          <CloseCircleOutlined style={{ color: '#FF6065', marginRight: '8px' }} />
        );

        if (subItem && typeof subItem.flag !== 'boolean') {
          icon = <LoadingOutlined style={{ color: '#4878FF', marginRight: '8px' }} />;
        }

        return (
          <div className={style['key-row']} key={i}>
            <div className={style['icon']}>{icon}</div>
            <div className={style['icon']}>关键点：</div>
            <div className={style['desc']}>{subItem?.desc || '--'}</div>
          </div>
        );
      })}
    </div>
  );
};

// 消息盒子
const MessageBox: React.FC<any> = (props: any) => {
  const { list } = props;

  return (
    <>
      {list.map((item: any, index: any) => {
        const lastType: any = index >= 1 ? list[index - 1]?.type : null;

        const { type, text, role, keysTips } = item;

        if (type === 'customer') {
          return (
            <div className={style['box_customer']} key={index}>
              <div className={style['box-avator']}>
                {lastType !== type && (
                  <img className={style['avator']} src={customerPhoto} alt="客方"></img>
                )}
              </div>

              <div className={style['box-content']}>{text}</div>
            </div>
          );
        } else if (type === 'system') {
          return (
            <div className={style['box_system']} key={index}>
              <div>
                <div className={style['box-content']}>{text}</div>

                <KeyTipsHtml list={keysTips}></KeyTipsHtml>
              </div>
              <div className={style['box-avator']}>
                {lastType !== type && (
                  <img className={style['avator']} src={robotPhoto} alt="我方"></img>
                )}
              </div>
            </div>
          );
        } else if (type === 'tips') {
          return (
            <div className={style['box_tips']} key={index}>
              {text}
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default MessageBox;
